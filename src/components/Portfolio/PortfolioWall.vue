<script setup>
import PortfolioCard from '@/components/Portfolio/PortfolioCard.vue';

const FAN = Object.freeze([
    {tilt: -6, drop: 30, theme: 'paper'},
    {tilt: -2, drop: 0, theme: 'deep'},
    {tilt: 3, drop: 16, theme: 'paper'},
    {tilt: 7, drop: 44, theme: 'accent'},
]);

defineProps({
    /** @type {import('vue').PropType<import('@/core/types').Work[]>} */
    works: {type: Array, required: true},
});

const emit = defineEmits(['open']);

/** @param {number} index */
function getFan(index) {
    return FAN[index % FAN.length];
}

/** @param {number} index */
function handleOpen(index) {
    emit('open', index);
}
</script>

<template>
    <TransitionGroup
        tag="ul"
        name="portfolio-wall"
        type="transition"
        class="portfolio-wall"
    >
        <PortfolioCard
            v-for="(work, index) in works"
            :key="work.id"
            :work="work"
            :tilt="getFan(index).tilt"
            :drop="getFan(index).drop"
            :theme="getFan(index).theme"
            @open="handleOpen(index)"
        />
    </TransitionGroup>
</template>

<style lang="scss">
.portfolio-wall {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-sm;

    @include tablet {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: $space-lg;
    }

    @include desktop {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        row-gap: $space-3xl;
        column-gap: $space-lg;

        @include padding('bottom', 12);
    }

    &-enter-active {
        transition: opacity $duration-long $ease-out;
    }

    &-enter-from {
        opacity: 0;
    }

    &-leave-active {
        display: none;
    }
}
</style>
