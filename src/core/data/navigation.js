import {SECTION_IDS} from '@/core/constants';

/** @type {readonly import('@/core/types').NavItem[]} */
export const NAV_ITEMS = Object.freeze([
    {id: SECTION_IDS.services, title: 'Цены'},
    {id: SECTION_IDS.portfolio, title: 'Работы'},
    {id: SECTION_IDS.about, title: 'Обо мне'},
    {id: SECTION_IDS.contacts, title: 'Контакты'},
]);
