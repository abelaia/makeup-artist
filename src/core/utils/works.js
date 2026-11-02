import {CATEGORY_ALL} from '@/core/constants';

/** @typedef {import('@/core/types').Work} Work */

/**
 * @param {readonly Work[]} works
 * @param {string} category
 * @returns {Work[]}
 */
export function filterWorks(works, category) {
    if (category === CATEGORY_ALL) {
        return [...works];
    }

    return works.filter((work) => work.category === category);
}

/**
 * @param {readonly Work[]} works
 * @returns {Record<string, number>}
 */
export function countWorksByCategory(works) {
    return works.reduce((counts, work) => ({...counts, [work.category]: (counts[work.category] ?? 0) + 1}), {
        [CATEGORY_ALL]: works.length,
    });
}
