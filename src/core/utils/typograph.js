const HANGING_WORDS = Object.freeze([
    'в',
    'во',
    'и',
    'а',
    'но',
    'с',
    'со',
    'к',
    'ко',
    'у',
    'о',
    'об',
    'от',
    'до',
    'на',
    'по',
    'за',
    'из',
    'не',
    'ни',
    'для',
    'без',
    'при',
    'про',
    'над',
    'под',
    'что',
    'как',
    'я',
    'мы',
    'вы',
    'же',
    'ли',
    'бы',
    'или',
]);

const HANGING_WORD = new RegExp(`(?<=^|[\\s(«"])(${HANGING_WORDS.join('|')})\\s+`, 'giu');
const DASH = /\s+—/gu;
const NBSP = '\u00A0';

/** @param {string} [text] */
export function typograph(text) {
    return text?.replace(DASH, `${NBSP}—`).replace(HANGING_WORD, `$1${NBSP}`);
}
