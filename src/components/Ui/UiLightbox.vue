<script setup>
import {computed, ref, watch} from 'vue';
import {useSwipe} from '@vueuse/core';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
} from 'reka-ui';
import {ChevronLeft, ChevronRight, X} from 'lucide-vue-next';
import {getPhoto, hasPhoto} from '@/core/helpers/photos';
import {pauseSmoothScroll, resumeSmoothScroll} from '@/core/helpers/motion';
import {typograph} from '@/core/utils/typograph';

import UiPlate from '@/components/Ui/UiPlate.vue';

const SWIPE_THRESHOLD = 60;

const props = defineProps({
    /** @type {import('vue').PropType<import('@/core/types').Work | null>} */
    item: {type: Object, default: null},
    counter: {type: String, default: ''},
    hasNavigation: {type: Boolean, default: true},
});

const emit = defineEmits(['close', 'next', 'previous']);

const stageRef = ref(null);

const photo = computed(() => (props.item && hasPhoto(props.item.photo) ? getPhoto(props.item.photo) : null));

watch(
    () => Boolean(props.item),
    (isOpen) => (isOpen ? pauseSmoothScroll() : resumeSmoothScroll()),
);

const {direction, lengthX, lengthY} = useSwipe(stageRef, {
    threshold: SWIPE_THRESHOLD,
    onSwipeEnd: handleSwipeEnd,
});

/** @param {boolean} isOpen */
function handleOpenChange(isOpen) {
    if (!isOpen) {
        emit('close');
    }
}

/** @param {KeyboardEvent} event */
function handleKeydown(event) {
    if (event.key === 'ArrowRight') {
        emit('next');
    }

    if (event.key === 'ArrowLeft') {
        emit('previous');
    }
}

/** @param {MouseEvent} event */
function handleStageClick(event) {
    if (event.target === event.currentTarget) {
        emit('close');
    }
}

function handleSwipeEnd() {
    const isVertical = Math.abs(lengthY.value) > Math.abs(lengthX.value);

    if (isVertical && direction.value === 'down') {
        emit('close');
        return;
    }

    if (!isVertical && props.hasNavigation) {
        emit(direction.value === 'left' ? 'next' : 'previous');
    }
}
</script>

<template>
    <DialogRoot
        :open="Boolean(item)"
        @update:open="handleOpenChange"
    >
        <DialogPortal>
            <DialogOverlay class="ui-lightbox" />
            <DialogContent
                class="ui-lightbox__window"
                @keydown="handleKeydown"
            >
                <div
                    ref="stageRef"
                    class="ui-lightbox__stage"
                    @click="handleStageClick"
                >
                    <picture
                        v-if="photo"
                        :key="item.id"
                        class="ui-lightbox__picture"
                    >
                        <source
                            type="image/avif"
                            :srcset="photo.avif"
                            sizes="100vw"
                        />
                        <source
                            type="image/webp"
                            :srcset="photo.webp"
                            sizes="100vw"
                        />
                        <img
                            class="ui-lightbox__image"
                            :src="photo.src"
                            :alt="item.alt"
                            :width="photo.width"
                            :height="photo.height"
                        />
                    </picture>
                    <UiPlate
                        v-else-if="item"
                        :key="`plate-${item.id}`"
                        class="ui-lightbox__plate"
                        :label="item.title"
                        note="Пример работы. Здесь будет фото"
                    />
                </div>

                <div class="ui-lightbox__bar">
                    <div class="ui-lightbox__caption">
                        <DialogTitle class="ui-lightbox__title">{{ typograph(item?.title) }}</DialogTitle>
                        <DialogDescription class="ui-lightbox__occasion">
                            {{ typograph(item?.occasion) }}
                        </DialogDescription>
                    </div>
                    <span
                        v-if="hasNavigation"
                        class="ui-lightbox__counter"
                        aria-live="polite"
                    >
                        {{ counter }}
                    </span>
                </div>

                <template v-if="hasNavigation">
                    <button
                        class="ui-lightbox__arrow ui-lightbox__arrow--previous"
                        type="button"
                        aria-label="Предыдущая работа"
                        @click="emit('previous')"
                    >
                        <ChevronLeft
                            :size="26"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        class="ui-lightbox__arrow ui-lightbox__arrow--next"
                        type="button"
                        aria-label="Следующая работа"
                        @click="emit('next')"
                    >
                        <ChevronRight
                            :size="26"
                            aria-hidden="true"
                        />
                    </button>
                </template>

                <DialogClose
                    class="ui-lightbox__close"
                    aria-label="Закрыть"
                >
                    <X
                        :size="24"
                        aria-hidden="true"
                    />
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style lang="scss">
.ui-lightbox {
    position: fixed;
    z-index: $z-modal;
    inset: 0;
    background-color: $color-overlay;

    &__window {
        position: fixed;
        z-index: $z-modal;
        inset: 0;
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto;
        color: $color-paper;

        &:focus-visible {
            outline: none;
        }
    }

    &__stage {
        overflow: hidden;
        min-height: 0;
        touch-action: pan-y;

        @include flex-center;
        @include padding('x', 4);
        @include padding('top', 16);

        @include desktop {
            @include padding('x', 24);
            @include padding('top', 10);
        }
    }

    &__picture {
        display: contents;
    }

    &__image {
        width: auto;
        max-width: 100%;
        height: auto;
        max-height: 100%;
        border-radius: $radius;
        object-fit: contain;
        user-select: none;
    }

    &__plate {
        width: min(100%, $lightbox-plate-width);
        max-height: 100%;
        aspect-ratio: $photo-ratio;
    }

    &__bar {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: $space-md;

        @include padding('x', 5);
        @include padding('y', 5);

        @include desktop {
            @include padding('x', 24);
        }
    }

    &__caption {
        @include column($space-2xs);
    }

    &__title {
        @include display($text-title);
    }

    &__occasion,
    &__counter {
        color: $color-paper-2;
        font-size: $text-sm;
    }

    &__counter {
        flex-shrink: 0;
        font-variant-numeric: tabular-nums;
    }

    &__arrow,
    &__close {
        position: absolute;
        width: $control-height;
        height: $control-height;
        color: $color-paper;
        border: $rule-ink solid $color-paper;
        border-radius: $radius;

        @include button-reset;
        @include flex-center;
        @include transition(background-color, color, transform);
        @include pressable;

        @include hover {
            color: $color-ink;
            background-color: $color-paper;
        }

        &:focus-visible {
            outline: 2px solid $color-paper;
            outline-offset: 2px;
            transition: none;
        }
    }

    &__close {
        top: $space-md;
        right: $space-md;
    }

    &__arrow {
        top: 50%;
        display: none;
        margin-top: calc(-1 * $control-height);

        @include desktop {
            display: flex;
        }

        &--previous {
            left: $space-lg;
        }

        &--next {
            right: $space-lg;
        }
    }
}
</style>
