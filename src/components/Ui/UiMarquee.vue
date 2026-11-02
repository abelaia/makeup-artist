<script setup>
import {computed} from 'vue';

const props = defineProps({
    items: {type: Array, required: true},
    separator: {type: String, default: '✿'},
});

const REPEAT_COUNT = 2;

const line = computed(() => props.items.map((item) => `${item} ${props.separator}`).join(' '));
</script>

<template>
    <div
        class="ui-marquee"
        aria-hidden="true"
    >
        <div class="ui-marquee__track">
            <span
                v-for="index in REPEAT_COUNT"
                :key="index"
                class="ui-marquee__line"
            >
                {{ line }}
            </span>
        </div>
    </div>
</template>

<style lang="scss">
.ui-marquee {
    overflow: hidden;
    background-color: $color-soft;

    @include padding('y', 5);

    &__track {
        display: flex;
        width: max-content;
        gap: $space-xl;
        animation: marquee $marquee-cycle linear infinite;
    }

    &__line {
        white-space: nowrap;

        @include title(clamp(1.5rem, 1.6vw + 1rem, 2rem));
    }
}
</style>
