<script setup>
import {MISSING_FACTS, PROFILE} from '@/core/data/profile';
import {SOCIALS} from '@/core/data/socials';
import {SECTION_IDS} from '@/core/constants';
import {typograph} from '@/core/utils/typograph';

import UiSocialLink from '@/components/Ui/UiSocialLink.vue';
</script>

<template>
    <section
        :id="SECTION_IDS.contacts"
        class="contacts"
        aria-labelledby="contacts-title"
    >
        <div class="contacts__inner container">
            <div class="contacts__intro">
                <h2
                    id="contacts-title"
                    class="contacts__title"
                >
                    {{ typograph(PROFILE.bookingTitle) }}
                </h2>
                <p class="contacts__lead lead">{{ typograph(PROFILE.bookingLead) }}</p>
                <dl class="contacts__facts">
                    <div class="contacts__fact">
                        <dt class="contacts__term">Город</dt>
                        <dd class="contacts__value">{{ PROFILE.city }}</dd>
                    </div>
                    <div class="contacts__fact">
                        <dt class="contacts__term">Где</dt>
                        <dd class="contacts__value contacts__value--missing">
                            Впишите: {{ MISSING_FACTS.address.toLowerCase() }}
                        </dd>
                    </div>
                    <div class="contacts__fact">
                        <dt class="contacts__term">Когда</dt>
                        <dd class="contacts__value contacts__value--missing">
                            Впишите: {{ MISSING_FACTS.schedule.toLowerCase() }}
                        </dd>
                    </div>
                </dl>
            </div>
            <ul class="contacts__links">
                <li
                    v-for="social in SOCIALS"
                    :key="social.id"
                >
                    <UiSocialLink :social="social" />
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss">
.contacts {
    color: $color-paper;
    border-radius: $radius-panel $radius-panel 0 0;
    background-color: $color-deep;

    @include adaptive(padding-block, $section-gap-s);

    &__inner {
        display: grid;
        row-gap: $space-2xl;

        @include desktop {
            @include twelve-columns;

            align-items: end;
        }
    }

    &__intro {
        container-type: inline-size;

        @include column($space-lg);

        @include desktop {
            grid-column: 1 / 7;
        }
    }

    &__title {
        font-size: min(#{$text-contacts}, #{$fit-display});
    }

    &__lead {
        color: $color-paper-2;
    }

    &__facts {
        border-top: $hairline solid $color-muted;
    }

    &__fact {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
        border-bottom: $hairline solid $color-muted;
        column-gap: $space-md;

        @include padding('y', 3);
    }

    &__term {
        color: $color-soft;
        font-size: $text-sm;
    }

    &__value {
        &--missing {
            width: fit-content;
            border-bottom: $hairline dashed $color-paper;
            font-size: $text-sm;
        }
    }

    &__links {
        border-top: $rule-ink solid $color-paper;

        @include desktop {
            grid-column: 8 / 13;
        }
    }
}
</style>
