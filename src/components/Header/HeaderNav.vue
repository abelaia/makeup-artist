<script setup>
import {computed} from 'vue';
import {NAV_ITEMS} from '@/core/data/navigation';
import {ROUTE_NAMES} from '@/core/constants';

const props = defineProps({
    variant: {type: String, default: 'bar', validator: (value) => ['bar', 'menu'].includes(value)},
});

const emit = defineEmits(['navigate']);

const links = computed(() =>
    NAV_ITEMS.map((item) => ({
        ...item,
        to: {name: ROUTE_NAMES.home, hash: `#${item.id}`},
    })),
);
const classes = computed(() => ['header-nav', `header-nav--${props.variant}`]);

function handleNavigate() {
    emit('navigate');
}
</script>

<template>
    <nav
        :class="classes"
        aria-label="Разделы сайта"
    >
        <ul class="header-nav__list">
            <li
                v-for="link in links"
                :key="link.id"
                class="header-nav__item"
            >
                <RouterLink
                    class="header-nav__link"
                    :to="link.to"
                    @click="handleNavigate"
                >
                    {{ link.title }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>
