import {describe, expect, it} from 'vitest';
import {countWorksByCategory, filterWorks} from './works';
import {formatCounter, formatPriceFrom} from './format';
import {typograph} from './typograph';
import {WORKS} from '@/core/data/works';
import {CATEGORY_ALL, WORK_CATEGORIES} from '@/core/constants';

describe('works', () => {
    it('у каждой работы известная категория и уникальный id', () => {
        const codes = WORK_CATEGORIES.map((category) => category.code);
        const ids = new Set(WORKS.map((work) => work.id));

        expect(WORKS.every((work) => codes.includes(work.category))).toBe(true);
        expect(ids.size).toBe(WORKS.length);
    });

    it('фильтрует по категории', () => {
        expect(filterWorks(WORKS, CATEGORY_ALL)).toHaveLength(WORKS.length);
        expect(filterWorks(WORKS, 'wedding').every((work) => work.category === 'wedding')).toBe(true);
        expect(countWorksByCategory(WORKS)[CATEGORY_ALL]).toBe(WORKS.length);
    });
});

describe('format', () => {
    it('пишет цену и счётчик по-русски', () => {
        expect(formatPriceFrom(3500).replace(/\s/g, ' ')).toBe('от 3 500 ₽');
        expect(formatCounter(2, 24)).toBe('3 / 24');
    });
});

describe('typograph', () => {
    it('связывает предлоги и союзы со следующим словом', () => {
        expect(typograph('Свадебный образ от пробы до вечера')).toBe('Свадебный образ от\u00A0пробы до\u00A0вечера');
        expect(typograph('Румяна и в тон')).toBe('Румяна и\u00A0в\u00A0тон');
        expect(typograph('Держится — весь день')).toBe('Держится\u00A0— весь день');
    });
});
