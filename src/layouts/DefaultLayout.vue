<script setup>
import BookingFloatingButton from '@/components/Contacts/BookingFloatingButton.vue';
import TheFooter from '@/components/Footer/TheFooter.vue';
import TheHeader from '@/components/Header/TheHeader.vue';
</script>

<template>
    <div class="default-layout">
        <a
            class="default-layout__skip"
            href="#content"
        >
            К содержимому
        </a>
        <TheHeader />
        <main
            id="content"
            class="default-layout__main"
        >
            <slot />
        </main>
        <TheFooter />
        <BookingFloatingButton />
    </div>
</template>

<style lang="scss">
.default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;

    &__main {
        flex-grow: 1;
    }

    &__skip {
        position: absolute;
        z-index: $z-modal;
        top: $space-xs;
        left: $space-xs;
        transform: translateY(-200%);
        color: $color-accent-ink;
        border-radius: $radius;
        background-color: $color-accent;

        @include padding('x', 4);
        @include padding('y', 2);

        &:focus-visible {
            transform: none;
            outline: 2px solid $color-focus;
            outline-offset: 2px;
        }
    }
}
</style>
