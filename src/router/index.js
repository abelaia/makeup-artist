import {createRouter, createWebHistory} from 'vue-router';
import {HEADER_OFFSET, PAGE_TRANSITION_MS, ROUTE_NAMES} from '@/core/constants';
import {smoothScrollTo} from '@/core/helpers/motion';

import HomePage from '@/pages/HomePage.vue';

const PAGE_TITLES = Object.freeze({
    [ROUTE_NAMES.home]: 'Диана, визажист',
    [ROUTE_NAMES.portfolio]: 'Все работы. Диана, визажист',
    [ROUTE_NAMES.notFound]: 'Страница не найдена. Диана, визажист',
});

/** @param {number} delayMs */
function wait(delayMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, delayMs);
    });
}

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: ROUTE_NAMES.home, component: HomePage},
        {path: '/portfolio', name: ROUTE_NAMES.portfolio, component: () => import('@/pages/PortfolioPage.vue')},
        {path: '/:pathMatch(.*)*', name: ROUTE_NAMES.notFound, component: () => import('@/pages/NotFoundPage.vue')},
    ],
    async scrollBehavior(to, from, savedPosition) {
        const isPageChange = to.name !== from.name;

        if (isPageChange) {
            await wait(PAGE_TRANSITION_MS);
        }

        const target = to.hash || (savedPosition?.top ?? 0);
        const isImmediate = isPageChange || Boolean(savedPosition);
        const offset = to.hash ? HEADER_OFFSET : 0;

        if (smoothScrollTo(target, {offset, isImmediate})) {
            return false;
        }

        if (savedPosition) {
            return savedPosition;
        }

        if (to.hash) {
            return {el: to.hash, top: HEADER_OFFSET, behavior: isPageChange ? 'auto' : 'smooth'};
        }

        return {top: 0};
    },
});

router.afterEach((to) => {
    document.title = PAGE_TITLES[to.name] ?? PAGE_TITLES[ROUTE_NAMES.home];
});
