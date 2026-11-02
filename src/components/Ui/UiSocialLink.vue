<script setup>
import {computed} from 'vue';

const props = defineProps({
    /** @type {import('vue').PropType<import('@/core/types').Social>} */
    social: {type: Object, required: true},
    isCompact: {type: Boolean, default: false},
});

const isExternal = computed(() => props.social.href.startsWith('http'));
</script>

<template>
    <a
        :class="['ui-social-link', {'ui-social-link--compact': isCompact}]"
        :href="social.href"
        :target="isExternal ? '_blank' : null"
        :rel="isExternal ? 'noopener' : null"
    >
        <component
            :is="social.icon"
            v-if="!isCompact"
            class="ui-social-link__icon"
            :size="24"
            aria-hidden="true"
        />
        <span class="ui-social-link__title">{{ social.title }}</span>
        <span
            v-if="!isCompact"
            class="ui-social-link__action"
        >
            {{ social.action }}
        </span>
    </a>
</template>

<style lang="scss">
.ui-social-link {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    min-height: calc($control-height + $space-lg);
    color: inherit;
    border-bottom: $hairline solid currentColor;
    text-decoration: none;
    column-gap: $space-md;

    @include transition(color, background-color);

    &__title {
        @include title($text-title);
    }

    &__action {
        font-size: $text-sm;
        text-align: right;
    }

    @include hover {
        .ui-social-link__title {
            text-decoration: underline;
            text-decoration-color: $color-soft;
            text-decoration-thickness: 2px;
            text-underline-offset: 6px;
        }
    }

    &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
    }

    &--compact {
        display: inline-flex;
        justify-content: center;
        min-width: $touch-target;
        min-height: $touch-target;
        border-bottom: none;

        .ui-social-link__title {
            font-family: $font-body;
            font-size: $text-md;
            font-weight: $font-weight-medium;
            letter-spacing: normal;
            text-decoration: underline;
            text-decoration-color: $color-soft;
            text-decoration-thickness: 1.5px;
            text-underline-offset: 6px;
        }
    }
}
</style>
