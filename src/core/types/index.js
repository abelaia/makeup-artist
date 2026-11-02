/**
 * @typedef {object} Photo
 * @property {string} name имя файла без размера и расширения
 * @property {number} width ширина оригинала
 * @property {number} height высота оригинала
 * @property {string} placeholder крошечное размытое превью в data URI
 * @property {string} avif srcset в AVIF
 * @property {string} webp srcset в WebP
 * @property {string} src запасной адрес
 */

/**
 * @typedef {object} Work
 * @property {string} id
 * @property {string} title название образа
 * @property {string} occasion повод
 * @property {string} category код из WORK_CATEGORIES
 * @property {string} photo имя фото в src/assets/images/photos (пока фото нет, показывается плашка)
 * @property {string} alt описание фото для незрячих
 */

/**
 * @typedef {object} Service
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} includes что входит
 * @property {string | null} duration null, пока Диана не вписала
 * @property {number | null} priceFrom цена в рублях; null, пока Диана не вписала
 */

/**
 * @typedef {object} Social
 * @property {string} id
 * @property {string} title
 * @property {string} action подпись действия
 * @property {string} href ссылка сразу в диалог
 * @property {import('vue').Component} icon
 * @property {boolean} [isPrimary]
 */

/**
 * @typedef {object} NavItem
 * @property {string} id якорь секции
 * @property {string} title
 */

export {};
