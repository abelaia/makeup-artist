<script setup>
import {useLightbox} from '@/composables/useLightbox';
import {WORKS} from '@/core/data/works';
import {HOME_WORKS_LIMIT, ROUTE_NAMES, SECTION_IDS} from '@/core/constants';
import {formatWorksCount} from '@/core/utils/format';

import PortfolioWall from '@/components/Portfolio/PortfolioWall.vue';
import UiButton from '@/components/Ui/UiButton.vue';
import UiLightbox from '@/components/Ui/UiLightbox.vue';
import UiSection from '@/components/Ui/UiSection.vue';

const LEAD = 'Нажмите на карточку, чтобы посмотреть образ крупно.';
const PORTFOLIO_ROUTE = Object.freeze({name: ROUTE_NAMES.portfolio});

const works = WORKS.slice(0, HOME_WORKS_LIMIT);

const {activeItem, counter, open, close, showNext, showPrevious} = useLightbox(works);
</script>

<template>
    <UiSection
        :id="SECTION_IDS.portfolio"
        class="portfolio-section"
        title="Работы"
        :lead="LEAD"
    >
        <PortfolioWall
            :works="works"
            @open="open"
        />
        <div class="portfolio-section__more">
            <UiButton
                :to="PORTFOLIO_ROUTE"
                theme="secondary"
            >
                Смотреть все {{ formatWorksCount(WORKS.length) }}
            </UiButton>
        </div>
        <UiLightbox
            :item="activeItem"
            :counter="counter"
            @close="close"
            @next="showNext"
            @previous="showPrevious"
        />
    </UiSection>
</template>

<style lang="scss">
.portfolio-section {
    &__more {
        display: flex;
        justify-content: center;

        @include margin('top', 20);
    }
}
</style>
