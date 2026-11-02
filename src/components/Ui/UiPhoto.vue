<script setup>
import {computed, ref} from 'vue';
import {getPhoto} from '@/core/helpers/photos';

const props = defineProps({
    name: {type: String, required: true},
    alt: {type: String, required: true},
    sizes: {type: String, default: '100vw'},
    isEager: {type: Boolean, default: false},
    isCover: {type: Boolean, default: false},
});

const isLoaded = ref(false);

const photo = computed(() => getPhoto(props.name));
const frameStyle = computed(() => ({
    aspectRatio: props.isCover ? null : `${photo.value.width} / ${photo.value.height}`,
    backgroundImage: `url(${photo.value.placeholder})`,
}));

function handleLoad() {
    isLoaded.value = true;
}
</script>

<template>
    <span
        :class="['ui-photo', {'ui-photo--cover': isCover, 'ui-photo--loaded': isLoaded}]"
        :style="frameStyle"
    >
        <picture>
            <source
                type="image/avif"
                :srcset="photo.avif"
                :sizes="sizes"
            />
            <source
                type="image/webp"
                :srcset="photo.webp"
                :sizes="sizes"
            />
            <img
                class="ui-photo__image"
                :src="photo.src"
                :alt="alt"
                :width="photo.width"
                :height="photo.height"
                :loading="isEager ? 'eager' : 'lazy'"
                :fetchpriority="isEager ? 'high' : 'auto'"
                decoding="async"
                @load="handleLoad"
            />
        </picture>
    </span>
</template>

<style lang="scss">
.ui-photo {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    border-radius: $radius;
    background-color: $color-paper-2;
    background-position: center;
    background-size: cover;

    &--cover {
        height: 100%;
    }

    &__image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;

        @include transition(opacity);

        transition-duration: $duration-long;
    }

    &--loaded {
        .ui-photo__image {
            opacity: 1;
        }
    }
}
</style>
