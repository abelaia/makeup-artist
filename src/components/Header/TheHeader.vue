<script setup>
import {useScrollHeader} from '@/composables/useScrollHeader';
import {PROFILE} from '@/core/data/profile';
import {SOCIALS} from '@/core/data/socials';
import {ROUTE_NAMES} from '@/core/constants';

import HeaderBurger from '@/components/Header/HeaderBurger.vue';
import HeaderNav from '@/components/Header/HeaderNav.vue';
import UiButton from '@/components/Ui/UiButton.vue';

const HOME_ROUTE = Object.freeze({name: ROUTE_NAMES.home});

const primarySocial = SOCIALS.find((social) => social.isPrimary);

const {isCompact} = useScrollHeader();
</script>

<template>
    <header :class="['header', {'header--compact': isCompact}]">
        <div class="header__inner container">
            <RouterLink
                class="header__brand"
                :to="HOME_ROUTE"
            >
                <span class="header__brand-name">{{ PROFILE.name }}</span>
                <span class="header__brand-role">{{ PROFILE.role }}</span>
            </RouterLink>
            <HeaderNav class="header__nav" />
            <UiButton
                class="header__action"
                :href="primarySocial.href"
            >
                Записаться
            </UiButton>
            <HeaderBurger />
        </div>
    </header>
</template>

<style lang="scss" src="./TheHeader.scss"></style>
