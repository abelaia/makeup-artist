<script setup>
import {computed} from 'vue';
import {RouterLink} from 'vue-router';

const props = defineProps({
    to: {type: [String, Object], default: null},
    href: {type: String, default: ''},
    theme: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'paper', 'ghost', 'link'].includes(value),
    },
    isBlock: {type: Boolean, default: false},
    isDisabled: {type: Boolean, default: false},
});

const isExternal = computed(() => props.href.startsWith('http'));
const tag = computed(() => {
    if (props.to) {
        return RouterLink;
    }

    return props.href ? 'a' : 'button';
});
const attributes = computed(() => {
    if (props.to) {
        return {to: props.to};
    }

    if (props.href) {
        return isExternal.value ? {href: props.href, target: '_blank', rel: 'noopener'} : {href: props.href};
    }

    return {type: 'button', disabled: props.isDisabled};
});
const classes = computed(() => ['ui-button', `ui-button--${props.theme}`, {'ui-button--block': props.isBlock}]);
</script>

<template>
    <component
        :is="tag"
        v-bind="attributes"
        :class="classes"
    >
        <slot />
    </component>
</template>

<style lang="scss">
.ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: $control-height;
    border: $rule-ink solid transparent;
    border-radius: $radius-pill;
    font-family: $font-body;
    font-size: $text-md;
    font-weight: $font-weight-bold;
    text-decoration: none;
    white-space: nowrap;
    gap: $space-xs;

    @include padding('x', 7);
    @include padding('y', 3);
    @include transition(background-color, color, border-color, transform);

    @include hover {
        transform: translateY(-2px);
    }
    @include pressable;

    &:focus-visible {
        outline: 2px solid $color-focus;
        outline-offset: 2px;
        transition: none;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: $disabled-opacity;
    }

    &--primary {
        color: $color-accent-ink;
        background-color: $color-accent;

        @include hover {
            background-color: $color-accent-hover;
        }
    }

    &--secondary {
        color: $color-ink;
        border-color: $color-ink;
        background-color: transparent;

        @include hover {
            background-color: $color-paper-3;
        }
    }

    &--paper {
        color: $color-ink;
        background-color: $color-paper;

        @include hover {
            background-color: $color-paper-2;
        }

        &:focus-visible {
            outline-color: $color-paper;
        }
    }

    &--ghost {
        color: $color-paper;
        border-color: $color-paper;
        background-color: transparent;

        @include hover {
            color: $color-deep;
            background-color: $color-paper;
        }

        &:focus-visible {
            outline-color: $color-paper;
        }
    }

    &--link {
        color: $color-ink;
        text-decoration: underline;
        text-decoration-thickness: 1.5px;
        text-underline-offset: 6px;
        background-color: transparent;

        @include hover {
            text-decoration-color: $color-accent;
        }
    }

    &--block {
        width: 100%;
    }
}
</style>
