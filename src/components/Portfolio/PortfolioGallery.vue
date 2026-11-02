<script setup>
import {useLightbox} from '@/composables/useLightbox';
import {usePortfolioFilter} from '@/composables/usePortfolioFilter';
import {WORKS} from '@/core/data/works';

import PortfolioFilters from '@/components/Portfolio/PortfolioFilters.vue';
import PortfolioWall from '@/components/Portfolio/PortfolioWall.vue';
import UiLightbox from '@/components/Ui/UiLightbox.vue';

const props = defineProps({
    limit: {type: Number, default: null},
    isSyncedWithRoute: {type: Boolean, default: false},
});

const {activeCategory, categories, visibleWorks, matchedWorks} = usePortfolioFilter(WORKS, {
    limit: () => props.limit,
    isSyncedWithRoute: props.isSyncedWithRoute,
});
const {activeItem, counter, open, close, showNext, showPrevious} = useLightbox(visibleWorks);
</script>

<template>
    <div class="portfolio-gallery">
        <PortfolioFilters
            v-model="activeCategory"
            :categories="categories"
        />
        <PortfolioWall
            :works="visibleWorks"
            @open="open"
        />
        <slot
            name="footer"
            :active-category="activeCategory"
            :matched-count="matchedWorks.length"
            :visible-count="visibleWorks.length"
        />
        <UiLightbox
            :item="activeItem"
            :counter="counter"
            :has-navigation="visibleWorks.length > 1"
            @close="close"
            @next="showNext"
            @previous="showPrevious"
        />
    </div>
</template>
