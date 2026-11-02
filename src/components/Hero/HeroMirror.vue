<script setup>
import {computed} from 'vue';

const props = defineProps({
    isLit: {type: Boolean, default: false},
});

const LIGHT_STEP_MS = 90;
const ROWS = Object.freeze([
    {side: 'left', count: 6, start: 0},
    {side: 'top', count: 5, start: 6},
    {side: 'right', count: 6, start: 11},
]);

const classes = computed(() => ['hero-mirror', {'hero-mirror--lit': props.isLit}]);
</script>

<template>
    <div :class="classes">
        <div class="hero-mirror__glass">
            <slot />
            <span
                class="hero-mirror__shine"
                aria-hidden="true"
            />
        </div>
        <span
            v-for="row in ROWS"
            :key="row.side"
            :class="['hero-mirror__row', `hero-mirror__row--${row.side}`]"
            aria-hidden="true"
        >
            <span
                v-for="index in row.count"
                :key="index"
                class="hero-mirror__bulb"
                :style="{'--delay': `${(row.start + index) * LIGHT_STEP_MS}ms`}"
            />
        </span>
    </div>
</template>

<style lang="scss">
.hero-mirror {
    position: relative;
    isolation: isolate;
    border-radius: $radius;
    background-color: $color-deep;
    box-shadow:
        $shadow-lift,
        inset 0 0 0 2px $color-deep-2,
        inset 0 2px 0 rgb(255 255 255 / 0.12);
    padding: $mirror-frame;

    &::before {
        position: absolute;
        z-index: -1;
        inset: -12%;
        content: '';
        border-radius: 50%;
        background: radial-gradient(closest-side, $color-bulb-glow, transparent);
        opacity: 0;
        transition: opacity 1.2s $ease-soft 1.2s;
    }

    &--lit::before {
        opacity: 1;
    }

    &__glass {
        position: relative;
        overflow: hidden;
        height: 100%;
        border-radius: $radius-inner;
        background-color: $color-soft;
        box-shadow: inset 0 18px 40px rgb(58 22 34 / 0.12);

        .ui-photo,
        .ui-plate {
            border-radius: 0;
        }
    }

    &__shine {
        position: absolute;
        z-index: 2;
        top: -10%;
        left: -30%;
        width: 55%;
        height: 130%;
        background: linear-gradient(100deg, transparent 20%, rgb(255 255 255 / 0.3) 50%, transparent 80%);
        transform: rotate(16deg);
        pointer-events: none;
    }

    &__row {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &--left,
        &--right {
            flex-direction: column;
            inset-block: $mirror-frame;
            width: $mirror-frame;
        }

        &--left {
            left: 0;
            flex-direction: column-reverse;
        }

        &--right {
            right: 0;
        }

        &--top {
            justify-content: space-evenly;
            top: 0;
            inset-inline: $mirror-frame;
            height: $mirror-frame;
        }
    }

    &__bulb {
        position: relative;
        width: $mirror-bulb-size;
        height: $mirror-bulb-size;
        border-radius: 50%;
        background: radial-gradient(
            circle at 38% 34%,
            #fff 0 16%,
            $color-bulb 42%,
            $color-bulb-warm 78%,
            $color-bulb-edge 100%
        );
        box-shadow: 0 0 0 4px $color-bulb-socket;

        &::after {
            position: absolute;
            inset: 0;
            content: '';
            border-radius: 50%;
            box-shadow:
                0 0 10px 3px rgb(255 236 196 / 0.95),
                0 0 34px 12px rgb(255 206 150 / 0.55),
                0 0 70px 24px rgb(255 190 140 / 0.22);
            opacity: 0;
        }
    }

    &--lit &__bulb::after {
        animation: bulb-on 900ms $ease-out var(--delay) both;
    }

    &--lit &__row--top &__bulb:nth-child(3)::after {
        animation:
            bulb-on 900ms $ease-out var(--delay) both,
            bulb-flicker 4.5s 2.5s infinite;
    }
}
</style>
