<script setup>
import {computed} from 'vue';
import {typograph} from '@/core/utils/typograph';

const props = defineProps({
    label: {type: String, required: true},
    note: {type: String, default: 'Здесь будет фото'},
    ratio: {type: Number, default: null},
    isFill: {type: Boolean, default: false},
});

const style = computed(() => (props.ratio ? {aspectRatio: `1 / ${props.ratio}`} : null));
</script>

<template>
    <div
        :class="['ui-plate', {'ui-plate--fill': isFill}]"
        :style="style"
        :data-slot="label"
        :data-alt="label"
    >
        <span class="ui-plate__note">{{ typograph(note) }}</span>
        <span class="ui-plate__label">{{ typograph(label) }}</span>
        <slot />
    </div>
</template>

<style lang="scss">
.ui-plate {
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    border-radius: $radius-inner;
    background: $color-soft;
    color: $color-ink;
    gap: $space-2xs;

    @include padding('x', 5);
    @include padding('y', 5);

    &--fill {
        height: 100%;
    }

    &__note {
        position: relative;
        z-index: 2;
        font-size: min(#{$text-sm}, #{$fit-plate-note});
        opacity: 0.8;
    }

    &__label {
        position: relative;
        z-index: 2;
        max-width: $plate-label-measure;

        @include title(min(#{$text-lg}, #{$fit-plate}));
    }
}
</style>
