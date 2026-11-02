<script setup>
import {computed} from 'vue';
import {MISSING_FACTS} from '@/core/data/profile';
import {formatPriceFrom} from '@/core/utils/format';
import {typograph} from '@/core/utils/typograph';

const props = defineProps({
    /** @type {import('vue').PropType<import('@/core/types').Service>} */
    service: {type: Object, required: true},
    index: {type: Number, required: true},
});

const THEMES = Object.freeze(['soft', 'soft-2', 'deep', 'outline', 'accent', 'soft']);

const price = computed(() => (props.service.priceFrom ? formatPriceFrom(props.service.priceFrom) : null));
const includes = computed(() => props.service.includes.join(', '));
const theme = computed(() => THEMES[props.index % THEMES.length]);
const style = computed(() => ({'--stack-index': props.index}));
</script>

<template>
    <li
        :class="['service-card', `service-card--${theme}`]"
        :style="style"
    >
        <div class="service-card__head">
            <h3 class="service-card__title">{{ typograph(service.title) }}</h3>
            <p
                v-if="price"
                class="service-card__price"
            >
                {{ price }}
            </p>
            <p
                v-else
                class="service-card__price service-card__price--missing"
            >
                впишите {{ MISSING_FACTS.price }}
            </p>
        </div>
        <p class="service-card__description">{{ typograph(service.description) }}</p>
        <p class="service-card__includes">{{ typograph(includes) }}</p>
        <p
            v-if="service.duration"
            class="service-card__duration"
        >
            {{ service.duration }}
        </p>
    </li>
</template>

<style lang="scss">
.service-card {
    min-height: $service-card-min-height;
    border-radius: $service-card-radius;
    background-color: $color-soft;

    @include column($space-sm);
    @include padding('x', 9);
    @include padding('y', 9);

    @include desktop {
        position: sticky;
        top: calc($header-height + $space-xl + var(--stack-index) * $service-stack-step);
    }

    &__head {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        column-gap: $space-md;
        row-gap: $space-2xs;
    }

    &__title {
        @include title(clamp(1.5rem, 1vw + 1.1rem, 1.875rem));
    }

    &__price {
        font-variant-numeric: tabular-nums;

        @include title($text-lg);

        &--missing {
            font-family: $font-body;
            font-size: $text-sm;
            opacity: 0.8;
        }
    }

    &__description {
        max-width: 34ch;
        font-size: $text-lead;
    }

    &__includes,
    &__duration {
        margin-top: auto;
        font-size: $text-sm;
        opacity: 0.85;
    }

    &--soft-2 {
        background-color: $color-soft-2;
    }

    &--deep {
        color: $color-paper;
        background-color: $color-deep;
    }

    &--outline {
        border: $rule-ink solid $color-rule;
        background-color: $color-paper;
    }

    &--accent {
        color: $color-accent-ink;
        background-color: $color-accent;
    }
}
</style>
