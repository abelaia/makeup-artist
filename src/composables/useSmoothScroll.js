import {onBeforeUnmount, onMounted} from 'vue';
import Lenis from 'lenis';
import {HEADER_OFFSET} from '@/core/constants';
import {MOTION_ALLOWED_QUERY, setSmoothScroll} from '@/core/helpers/motion';

const SCROLL_DURATION_SECONDS = 1;

export function useSmoothScroll() {
    /** @type {Lenis | null} */
    let lenis = null;

    onMounted(() => {
        if (!window.matchMedia(MOTION_ALLOWED_QUERY).matches) {
            return;
        }

        lenis = new Lenis({duration: SCROLL_DURATION_SECONDS, anchors: {offset: -HEADER_OFFSET}, autoRaf: true});
        setSmoothScroll(lenis);
    });

    onBeforeUnmount(() => {
        lenis?.destroy();
        setSmoothScroll(null);
    });
}
