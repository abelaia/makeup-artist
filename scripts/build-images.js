import {mkdir, readdir, writeFile} from 'node:fs/promises';
import {extname, basename} from 'node:path';
import {fileURLToPath, URL} from 'node:url';
import sharp from 'sharp';

const SOURCE_DIRECTORY = fileURLToPath(new URL('../images-source/', import.meta.url));
const OUTPUT_DIRECTORY = fileURLToPath(new URL('../src/assets/images/photos/', import.meta.url));
const SOURCE_EXTENSIONS = Object.freeze(['.jpg', '.jpeg', '.png', '.webp']);
const WIDTHS = Object.freeze([480, 960, 1600]);
const PLACEHOLDER_WIDTH = 24;
const FORMATS = Object.freeze({
    avif: {quality: 55},
    webp: {quality: 78},
});

async function buildPhoto(fileName) {
    const name = basename(fileName, extname(fileName)).toLowerCase();
    const image = sharp(`${SOURCE_DIRECTORY}${fileName}`).rotate();
    const {width, height} = await image.metadata();
    const largestWidth = Math.min(width, WIDTHS.at(-1));
    const outputWidths = [...new Set([...WIDTHS.filter((targetWidth) => targetWidth < width), largestWidth])];

    const tasks = outputWidths.flatMap((targetWidth) =>
        Object.entries(FORMATS).map(([format, options]) =>
            image
                .clone()
                .resize({width: targetWidth})
                .toFormat(format, options)
                .toFile(`${OUTPUT_DIRECTORY}${name}-${targetWidth}.${format}`),
        ),
    );

    const placeholderBuffer = await image
        .clone()
        .resize({width: PLACEHOLDER_WIDTH})
        .blur()
        .webp({quality: 40})
        .toBuffer();

    await Promise.all(tasks);

    return [
        name,
        {
            width,
            height,
            widths: outputWidths,
            placeholder: `data:image/webp;base64,${placeholderBuffer.toString('base64')}`,
        },
    ];
}

await mkdir(OUTPUT_DIRECTORY, {recursive: true});

const files = (await readdir(SOURCE_DIRECTORY)).filter((fileName) =>
    SOURCE_EXTENSIONS.includes(extname(fileName).toLowerCase()),
);
const entries = await Promise.all(files.map(buildPhoto));
const manifest = Object.fromEntries(entries.sort(([first], [second]) => first.localeCompare(second)));

await writeFile(`${OUTPUT_DIRECTORY}manifest.json`, `${JSON.stringify(manifest, null, 4)}\n`);

console.log(`Готово: ${entries.length} фото → src/assets/images/photos/`);
