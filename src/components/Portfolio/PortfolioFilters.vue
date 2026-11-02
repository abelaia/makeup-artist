<script setup>
import {ToggleGroupItem, ToggleGroupRoot} from 'reka-ui';

defineProps({
    categories: {type: Array, required: true},
});

const activeCategory = defineModel({type: String, required: true});

/** @param {string} value */
function handleChange(value) {
    if (value) {
        activeCategory.value = value;
    }
}
</script>

<template>
    <ToggleGroupRoot
        class="portfolio-filters"
        type="single"
        :model-value="activeCategory"
        aria-label="Поводы"
        @update:model-value="handleChange"
    >
        <ToggleGroupItem
            v-for="category in categories"
            :key="category.code"
            class="portfolio-filters__item"
            :value="category.code"
        >
            <span class="portfolio-filters__title">{{ category.title }}</span>
            <span class="portfolio-filters__count">{{ category.count }}</span>
        </ToggleGroupItem>
    </ToggleGroupRoot>
</template>

<style lang="scss">
.portfolio-filters {
    display: flex;
    overflow-x: auto;
    gap: $space-xs;
    scrollbar-width: none;

    @include padding('y', 1);
    @include margin('bottom', 14);

    @include desktop {
        flex-wrap: wrap;
        overflow-x: visible;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &__item {
        display: flex;
        flex-shrink: 0;
        align-items: baseline;
        min-height: $touch-target;
        color: $color-ink;
        border: $rule-ink solid $color-rule;
        border-radius: $radius-pill;
        background-color: transparent;
        font-size: $text-md;
        font-weight: $font-weight-medium;
        gap: $space-xs;

        @include padding('x', 5);
        @include padding('y', 2);
        @include transition(background-color, color, border-color);

        @include hover {
            border-color: $color-ink;
        }

        &:focus-visible {
            outline: 2px solid $color-focus;
            outline-offset: 2px;
        }

        &[data-state='on'] {
            color: $color-paper;
            border-color: $color-deep;
            background-color: $color-deep;
            font-weight: $font-weight-bold;

            .portfolio-filters__count {
                color: inherit;
                opacity: 0.8;
            }
        }
    }

    &__title {
        white-space: nowrap;
    }

    &__count {
        white-space: nowrap;

        @include label;
    }
}
</style>
