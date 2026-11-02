<script setup>
import {WORKS} from '@/core/data/works';

import CaseSection from '@/components/Case/CaseSection.vue';
import ContactsSection from '@/components/Contacts/ContactsSection.vue';
import PortfolioGallery from '@/components/Portfolio/PortfolioGallery.vue';
import UiSection from '@/components/Ui/UiSection.vue';

const LEAD = `${WORKS.length} образов по шести поводам. Нажмите на карточку, чтобы посмотреть образ крупно.`;
</script>

<template>
    <UiSection
        id="all-works"
        title="Все работы"
        :lead="LEAD"
    >
        <PortfolioGallery is-synced-with-route />
    </UiSection>
    <CaseSection />
    <ContactsSection />
</template>
