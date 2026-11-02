<script setup>
import {computed} from 'vue';
import {WORK_CATEGORIES} from '@/core/constants';
import {typograph} from '@/core/utils/typograph';

import UiSlotPhoto from '@/components/Ui/UiSlotPhoto.vue';

const props = defineProps({
    /** @type {import('vue').PropType<import('@/core/types').Work>} */
    work: {type: Object, required: true},
    tilt: {type: Number, default: 0},
    drop: {type: Number, default: 0},
    theme: {type: String, default: 'paper', validator: (value) => ['paper', 'deep', 'accent'].includes(value)},
});

const emit = defineEmits(['open']);

const category = computed(() => WORK_CATEGORIES.find((item) => item.code === props.work.category));
const style = computed(() => ({'--tilt': `${props.tilt}deg`, '--drop': `${props.drop}px`}));

function handleOpen() {
    emit('open');
}
</script>

<template>
    <li
        :class="['portfolio-card', `portfolio-card--${theme}`]"
        :style="style"
    >
        <div class="portfolio-card__photo">
            <UiSlotPhoto
                :photo="work.photo"
                :alt="work.alt"
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 40vw, 80vw"
                :label="category.title"
                is-cover
            />
        </div>
        <div class="portfolio-card__caption">
            <h3 class="portfolio-card__title">{{ typograph(work.title) }}</h3>
            <p class="portfolio-card__occasion">{{ typograph(work.occasion) }}</p>
        </div>
        <button
            type="button"
            class="portfolio-card__open"
            :aria-label="`Смотреть крупно: ${work.title}`"
            @click="handleOpen"
        />
    </li>
</template>

<style lang="scss">
.portfolio-card {
    position: relative;
    isolation: isolate;
    border-radius: $radius;
    background-color: $color-paper-2;
    box-shadow: $shadow-card;

    @include column($space-sm);
    @include padding('x', 2);
    @include padding('top', 2);
    @include padding('bottom', 4);

    @include tablet {
        row-gap: $space-md;

        @include padding('x', 3);
        @include padding('top', 3);
        @include padding('bottom', 5);
    }
    @include desktop {
        transform: translateY(var(--drop)) rotate(var(--tilt));
    }

    @include lift;

    &__photo {
        overflow: hidden;
        border-radius: $radius-inner;
        aspect-ratio: $photo-ratio;

        .ui-photo,
        .ui-plate {
            border-radius: 0;
        }

        .ui-plate {
            @include padding('x', 3);
            @include padding('y', 3);

            @include tablet {
                @include padding('x', 5);
                @include padding('y', 5);
            }
        }
    }

    &__caption {
        container-type: inline-size;

        @include column($space-2xs);
        @include padding('x', 2);
    }

    &__title {
        @include title(min(#{$text-md}, #{$fit-card}));

        @include tablet {
            font-size: min(#{$text-lg}, #{$fit-card});
        }
    }

    &__occasion {
        color: $color-muted;
        font-size: $text-sm;
    }

    &__open {
        position: absolute;
        z-index: 3;
        inset: 0;
        border-radius: $radius;
        cursor: zoom-in;

        @include button-reset;

        &:focus-visible {
            outline: 2px solid $color-focus;
            outline-offset: 4px;
        }
    }

    &--deep {
        color: $color-paper;
        background-color: $color-deep;

        .ui-plate {
            color: $color-paper;
            background-color: $color-deep-2;
        }
    }

    &--accent {
        color: $color-accent-ink;
        background-color: $color-accent;
    }

    &--deep &__occasion,
    &--accent &__occasion {
        color: inherit;
        opacity: 0.85;
    }
}
</style>
