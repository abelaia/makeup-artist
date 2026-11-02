<script setup>
import {useScrollHeader} from '@/composables/useScrollHeader';
import {SOCIALS} from '@/core/data/socials';

import UiButton from '@/components/Ui/UiButton.vue';

const primarySocial = SOCIALS.find((social) => social.isPrimary);

const {isPastFirstScreen} = useScrollHeader();
</script>

<template>
    <div
        v-if="isPastFirstScreen"
        class="booking-floating-button"
    >
        <UiButton
            :href="primarySocial.href"
            is-block
        >
            Записаться в Telegram
        </UiButton>
    </div>
</template>

<style lang="scss">
.booking-floating-button {
    position: fixed;
    z-index: $z-raised;

    @include adaptive(right bottom left, $gutter);

    @include tablet {
        display: none;
    }
}
</style>
