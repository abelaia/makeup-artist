<script setup>
import {ROUTE_NAMES} from '@/core/constants';

import UiButton from '@/components/Ui/UiButton.vue';

const HOME_ROUTE = Object.freeze({name: ROUTE_NAMES.home});
const PORTFOLIO_ROUTE = Object.freeze({name: ROUTE_NAMES.portfolio});
</script>

<template>
    <section class="not-found">
        <div class="not-found__inner container">
            <h1 class="not-found__title">Такой страницы нет</h1>
            <p class="not-found__text">Возможно, ссылка устарела. Работы и контакты есть на главной.</p>
            <div class="not-found__actions">
                <UiButton :to="HOME_ROUTE">На главную</UiButton>
                <UiButton
                    :to="PORTFOLIO_ROUTE"
                    theme="secondary"
                >
                    Смотреть работы
                </UiButton>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.not-found {
    @include adaptive(padding-block, $section-gap);

    &__inner {
        @include column($space-lg);
    }

    &__text {
        color: $color-ink-2;
    }

    &__actions {
        display: flex;
        flex-wrap: wrap;
        gap: $space-sm;
    }
}
</style>
