<script setup>
import {SERVICES} from '@/core/data/services';
import {SOCIALS} from '@/core/data/socials';
import {SECTION_IDS} from '@/core/constants';
import {typograph} from '@/core/utils/typograph';

import ServiceCard from '@/components/Services/ServiceCard.vue';
import UiButton from '@/components/Ui/UiButton.vue';

const LEAD = 'Подготовка кожи входит в каждый образ. Точную цену назову в переписке, до записи.';

const primarySocial = SOCIALS.find((social) => social.isPrimary);
</script>

<template>
    <section
        :id="SECTION_IDS.services"
        class="services"
        aria-labelledby="services-title"
    >
        <div class="services__inner container">
            <div class="services__intro">
                <h2
                    id="services-title"
                    class="services__title"
                >
                    Услуги
                </h2>
                <p class="services__lead">{{ typograph(LEAD) }}</p>
                <UiButton
                    :href="primarySocial.href"
                    theme="secondary"
                >
                    Спросить про свой повод
                </UiButton>
            </div>
            <ul class="services__stack">
                <ServiceCard
                    v-for="(service, index) in SERVICES"
                    :key="service.id"
                    :service="service"
                    :index="index"
                />
            </ul>
        </div>
    </section>
</template>

<style lang="scss">
.services {
    border-radius: $radius-panel $radius-panel 0 0;
    background-color: $color-paper-2;

    @include adaptive(padding-block, $section-gap-s);

    &__inner {
        display: grid;
        align-items: start;
        row-gap: $space-2xl;

        @include desktop {
            @include twelve-columns;
        }
    }

    &__intro {
        align-items: flex-start;

        @include column($space-lg);

        @include desktop {
            position: sticky;
            top: calc($header-height + $space-xl);
            grid-column: 1 / 6;
        }
    }

    &__title {
        font-size: $text-section;
    }

    &__lead {
        max-width: 30ch;
        color: $color-ink-2;
        font-size: $text-lead;
    }

    &__stack {
        @include column($space-lg);

        @include desktop {
            grid-column: 6 / 13;
        }
    }
}
</style>
