import {computed, ref, toValue} from 'vue';
import {formatCounter} from '@/core/utils/format';

/**
 * @template T
 * @param {import('vue').MaybeRefOrGetter<readonly T[]>} items
 */
export function useLightbox(items) {
    /** @type {import('vue').Ref<number | null>} */
    const activeIndex = ref(null);

    const isOpen = computed(() => activeIndex.value !== null);
    const total = computed(() => toValue(items).length);
    const activeItem = computed(() => (isOpen.value ? toValue(items)[activeIndex.value] : null));
    const counter = computed(() => (isOpen.value ? formatCounter(activeIndex.value, total.value) : ''));

    /** @param {number} index */
    function open(index) {
        activeIndex.value = index;
    }

    function close() {
        activeIndex.value = null;
    }

    /** @param {number} step */
    function move(step) {
        if (!isOpen.value) {
            return;
        }

        activeIndex.value = (activeIndex.value + step + total.value) % total.value;
    }

    function showNext() {
        move(1);
    }

    function showPrevious() {
        move(-1);
    }

    return {activeIndex, activeItem, isOpen, total, counter, open, close, showNext, showPrevious};
}
