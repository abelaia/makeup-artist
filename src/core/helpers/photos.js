import manifest from '@/assets/images/photos/manifest.json';

const PHOTO_FILES = import.meta.glob('../../assets/images/photos/*.{avif,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
});

const URLS_BY_FILE = Object.fromEntries(
    Object.entries(PHOTO_FILES).map(([path, url]) => [path.split('/').at(-1), url]),
);

const FALLBACK_WIDTH_INDEX = 1;

/**
 * @param {string} name
 * @param {number[]} widths
 * @param {'avif' | 'webp'} format
 */
function getSrcset(name, widths, format) {
    return widths.map((width) => `${URLS_BY_FILE[`${name}-${width}.${format}`]} ${width}w`).join(', ');
}

/** @param {string} name */
export function hasPhoto(name) {
    return Boolean(manifest[name]);
}

/**
 * @param {string} name
 * @returns {import('@/core/types').Photo}
 */
export function getPhoto(name) {
    const entry = manifest[name];

    if (!entry) {
        throw new Error(`Нет фото «${name}». Положите файл в images-source/ и запустите npm run images.`);
    }

    const fallbackWidth = entry.widths[Math.min(FALLBACK_WIDTH_INDEX, entry.widths.length - 1)];

    return {
        name,
        width: entry.width,
        height: entry.height,
        placeholder: entry.placeholder,
        avif: getSrcset(name, entry.widths, 'avif'),
        webp: getSrcset(name, entry.widths, 'webp'),
        src: URLS_BY_FILE[`${name}-${fallbackWidth}.webp`],
    };
}
