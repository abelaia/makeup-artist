const NUMBER_FORMATTER = new Intl.NumberFormat('ru-RU', {maximumFractionDigits: 0});

/** @param {number} value */
export function formatPriceFrom(value) {
    return `от ${NUMBER_FORMATTER.format(value)} ₽`;
}

const PLURAL_RULES = new Intl.PluralRules('ru-RU');
const WORK_FORMS = Object.freeze({one: 'работа', few: 'работы', many: 'работ', other: 'работы'});

/** @param {number} count */
export function formatWorksCount(count) {
    return `${count} ${WORK_FORMS[PLURAL_RULES.select(count)]}`;
}

/**
 * @param {number} index с нуля
 * @param {number} total
 */
export function formatCounter(index, total) {
    return `${index + 1} / ${total}`;
}
