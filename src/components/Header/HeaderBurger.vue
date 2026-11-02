<script setup>
import {ref, watch} from 'vue';
import {pauseSmoothScroll, resumeSmoothScroll} from '@/core/helpers/motion';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'reka-ui';
import {Menu, X} from 'lucide-vue-next';
import {PROFILE} from '@/core/data/profile';
import {SOCIALS} from '@/core/data/socials';

import HeaderNav from '@/components/Header/HeaderNav.vue';
import UiSocialLink from '@/components/Ui/UiSocialLink.vue';

const isOpen = ref(false);

watch(isOpen, (isMenuOpen) => (isMenuOpen ? pauseSmoothScroll() : resumeSmoothScroll()));

function handleNavigate() {
    isOpen.value = false;
}
</script>

<template>
    <DialogRoot v-model:open="isOpen">
        <DialogTrigger
            class="header-burger"
            aria-label="Открыть меню"
        >
            <Menu
                :size="24"
                aria-hidden="true"
            />
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay class="header-burger__overlay" />
            <DialogContent class="header-burger__panel">
                <DialogTitle class="header-burger__title">{{ PROFILE.name }}, {{ PROFILE.role }}</DialogTitle>
                <DialogDescription class="header-burger__description">Разделы сайта и контакты</DialogDescription>
                <HeaderNav
                    variant="menu"
                    @navigate="handleNavigate"
                />
                <ul class="header-burger__socials">
                    <li
                        v-for="social in SOCIALS"
                        :key="social.id"
                    >
                        <UiSocialLink
                            :social="social"
                            is-compact
                        />
                    </li>
                </ul>
                <DialogClose
                    class="header-burger__close"
                    aria-label="Закрыть меню"
                >
                    <X
                        :size="24"
                        aria-hidden="true"
                    />
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
