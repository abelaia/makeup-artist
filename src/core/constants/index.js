export const ROUTE_NAMES = Object.freeze({
    home: 'home',
    portfolio: 'portfolio',
    notFound: 'not-found',
});

export const SECTION_IDS = Object.freeze({
    top: 'top',
    case: 'case',
    portfolio: 'portfolio',
    about: 'about',
    services: 'services',
    contacts: 'contacts',
});

export const CATEGORY_ALL = 'all';

export const WORK_CATEGORIES = Object.freeze([
    {code: CATEGORY_ALL, title: 'Все работы'},
    {code: 'wedding', title: 'Свадебный'},
    {code: 'evening', title: 'Вечерний'},
    {code: 'nude', title: 'Дневной / nude'},
    {code: 'photo', title: 'Фотосессия'},
    {code: 'prom', title: 'Выпускной'},
    {code: 'creative', title: 'Креатив'},
]);

export const HOME_WORKS_LIMIT = 8;

export const PAGE_TRANSITION_MS = 350;

export const HEADER_OFFSET = 72;

export const CATEGORY_QUERY_KEY = 'category';
