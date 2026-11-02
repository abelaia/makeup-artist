<script setup>
import {useSmoothScroll} from '@/composables/useSmoothScroll';

import DefaultLayout from '@/layouts/DefaultLayout.vue';

useSmoothScroll();
</script>

<template>
    <DefaultLayout>
        <RouterView v-slot="{Component, route}">
            <component
                :is="Component"
                :key="route.name"
            />
        </RouterView>
    </DefaultLayout>
</template>
