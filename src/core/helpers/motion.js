export const MOTION_ALLOWED_QUERY = '(prefers-reduced-motion: no-preference)';

/** @type {import('lenis').default | null} */
let smoothScroll = null;

/** @param {import('lenis').default | null} instance */
export function setSmoothScroll(instance) {
    smoothScroll = instance;
}

/**
 * @param {string | number} target селектор или координата
 * @param {{offset?: number, isImmediate?: boolean}} [options]
 * @returns {boolean} получилось ли прокрутить через Lenis
 */
export function smoothScrollTo(target, {offset = 0, isImmediate = false} = {}) {
    if (!smoothScroll) {
        return false;
    }

    smoothScroll.scrollTo(target, {offset: -offset, immediate: isImmediate});

    return true;
}

export function pauseSmoothScroll() {
    smoothScroll?.stop();
}

export function resumeSmoothScroll() {
    smoothScroll?.start();
}
