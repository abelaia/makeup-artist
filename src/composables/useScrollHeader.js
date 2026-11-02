import {computed, onMounted, ref} from 'vue';
import {useEventListener, useWindowSize} from '@vueuse/core';

const COMPACT_OFFSET = 24;
const FIRST_SCREEN_SHARE = 0.85;

export function useScrollHeader() {
    const {height: windowHeight} = useWindowSize();

    const scrollTop = ref(0);
    const frameId = ref(null);

    const isCompact = computed(() => scrollTop.value > COMPACT_OFFSET);
    const isPastFirstScreen = computed(() => scrollTop.value > windowHeight.value * FIRST_SCREEN_SHARE);

    onMounted(updateScrollTop);

    useEventListener(window, 'scroll', handleScroll, {passive: true});

    function updateScrollTop() {
        frameId.value = null;
        scrollTop.value = window.scrollY;
    }

    function handleScroll() {
        if (frameId.value !== null) {
            return;
        }

        frameId.value = requestAnimationFrame(updateScrollTop);
    }

    return {isCompact, isPastFirstScreen};
}
