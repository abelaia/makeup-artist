<script setup>
import {CATEGORY_ALL, WORK_CATEGORIES} from '@/core/constants';

import AboutSection from '@/components/About/AboutSection.vue';
import CaseSection from '@/components/Case/CaseSection.vue';
import ContactsSection from '@/components/Contacts/ContactsSection.vue';
import HeroSection from '@/components/Hero/HeroSection.vue';
import PortfolioSection from '@/components/Portfolio/PortfolioSection.vue';
import ServicesSection from '@/components/Services/ServicesSection.vue';
import UiMarquee from '@/components/Ui/UiMarquee.vue';

const OCCASIONS = Object.freeze([
    ...WORK_CATEGORIES.filter(({code}) => code !== CATEGORY_ALL).map(({title}) => title.toLowerCase()),
    'уроки',
]);
</script>

<template>
    <HeroSection />
    <UiMarquee :items="OCCASIONS" />
    <PortfolioSection />
    <ServicesSection />
    <CaseSection />
    <AboutSection />
    <ContactsSection />
</template>
