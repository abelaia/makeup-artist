import {computed, ref, toValue, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {CATEGORY_ALL, CATEGORY_QUERY_KEY, WORK_CATEGORIES} from '@/core/constants';
import {formatWorksCount} from '@/core/utils/format';
import {countWorksByCategory, filterWorks} from '@/core/utils/works';

/**
 * @param {import('vue').MaybeRefOrGetter<readonly import('@/core/types').Work[]>} works
 * @param {{limit?: import('vue').MaybeRefOrGetter<number | null>, isSyncedWithRoute?: boolean}} [options]
 */
export function usePortfolioFilter(works, {limit = null, isSyncedWithRoute = false} = {}) {
    const route = useRoute();
    const router = useRouter();

    const activeCategory = ref(getRouteCategory());

    const counts = computed(() => countWorksByCategory(toValue(works)));
    const categories = computed(() =>
        WORK_CATEGORIES.filter((category) => counts.value[category.code]).map((category) => ({
            ...category,
            count: counts.value[category.code],
            countLabel: formatWorksCount(counts.value[category.code]),
        })),
    );
    const matchedWorks = computed(() => filterWorks(toValue(works), activeCategory.value));
    const visibleWorks = computed(() => {
        const maxCount = toValue(limit);

        return maxCount ? matchedWorks.value.slice(0, maxCount) : matchedWorks.value;
    });

    watch(activeCategory, (category) => {
        if (!isSyncedWithRoute) {
            return;
        }

        const query = category === CATEGORY_ALL ? {} : {[CATEGORY_QUERY_KEY]: category};
        router.replace({query});
    });

    function getRouteCategory() {
        const category = isSyncedWithRoute ? route.query[CATEGORY_QUERY_KEY] : null;
        const isKnown = WORK_CATEGORIES.some(({code}) => code === category);

        return isKnown ? category : CATEGORY_ALL;
    }

    return {activeCategory, categories, matchedWorks, visibleWorks};
}
