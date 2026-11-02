<script setup>
import {PROFILE} from '@/core/data/profile';
import {SOCIALS} from '@/core/data/socials';
import {smoothScrollTo} from '@/core/helpers/motion';

import UiSocialLink from '@/components/Ui/UiSocialLink.vue';

const CURRENT_YEAR = new Date().getFullYear();

function handleScrollTop() {
    if (!smoothScrollTo(0)) {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}
</script>

<template>
    <footer class="footer">
        <div class="footer__inner container">
            <p class="footer__colophon">
                <span class="footer__name">{{ PROFILE.name }}, {{ PROFILE.role }}.</span>
                {{ PROFILE.place }}. © {{ CURRENT_YEAR }}
            </p>
            <ul class="footer__links">
                <li
                    v-for="social in SOCIALS"
                    :key="social.id"
                >
                    <UiSocialLink
                        :social="social"
                        is-compact
                    />
                </li>
                <li>
                    <button
                        class="footer__top"
                        type="button"
                        @click="handleScrollTop"
                    >
                        Наверх
                    </button>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style lang="scss">
.footer {
    color: $color-paper-2;
    background-color: $color-deep;

    @include padding('bottom', 24);

    @include tablet {
        @include padding('bottom', 10);
    }

    &__inner {
        display: grid;
        border-top: $hairline solid $color-muted;
        row-gap: $space-lg;

        @include padding('top', 8);

        @include desktop {
            @include twelve-columns;
        }
    }

    &__colophon {
        max-width: 60ch;

        @include desktop {
            grid-column: 1 / 7;
        }
    }

    &__name {
        color: $color-paper;

        @include title($text-md);
    }

    &__links {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        column-gap: $space-lg;

        @include desktop {
            grid-column: 8 / 13;
            justify-content: flex-end;
        }
    }

    &__top {
        min-height: $touch-target;
        color: $color-paper;
        font-size: $text-md;
        font-weight: $font-weight-medium;
        text-decoration: underline;
        text-decoration-color: $color-soft;
        text-decoration-thickness: 1.5px;
        text-underline-offset: 6px;

        @include button-reset;

        &:focus-visible {
            outline: 2px solid $color-paper;
            outline-offset: 2px;
        }
    }
}
</style>
