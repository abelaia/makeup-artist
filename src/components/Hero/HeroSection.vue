<script setup>
import {onMounted, ref} from 'vue';
import {PROFILE} from '@/core/data/profile';
import {SOCIALS} from '@/core/data/socials';
import {WORKS} from '@/core/data/works';
import {SECTION_IDS} from '@/core/constants';
import {typograph} from '@/core/utils/typograph';

import HeroMirror from '@/components/Hero/HeroMirror.vue';
import UiButton from '@/components/Ui/UiButton.vue';
import UiSlotPhoto from '@/components/Ui/UiSlotPhoto.vue';

const primarySocial = SOCIALS.find((social) => social.isPrimary);
const [, heroWork] = WORKS;

const isLit = ref(false);

onMounted(() => {
    isLit.value = true;
});
</script>

<template>
    <section
        :id="SECTION_IDS.top"
        class="hero"
        aria-labelledby="hero-title"
    >
        <div class="hero__inner container">
            <div class="hero__text">
                <h1
                    id="hero-title"
                    class="hero__title"
                >
                    {{ typograph(PROFILE.headline) }}
                </h1>
                <p class="hero__lead">{{ typograph(PROFILE.lead) }}</p>
                <div class="hero__actions">
                    <UiButton :href="primarySocial.href">Выбрать дату</UiButton>
                    <UiButton
                        :href="`#${SECTION_IDS.portfolio}`"
                        theme="link"
                    >
                        Смотреть работы
                    </UiButton>
                </div>
            </div>
            <div class="hero__stage">
                <HeroMirror
                    class="hero__mirror"
                    :is-lit="isLit"
                >
                    <UiSlotPhoto
                        :photo="PROFILE.heroPhoto"
                        :alt="PROFILE.heroAlt"
                        sizes="(min-width: 1024px) 28vw, 60vw"
                        is-eager
                        :label="PROFILE.heroSlot"
                        note="Отражение в зеркале: фото Дианы"
                        is-cover
                    />
                </HeroMirror>
                <div class="hero__card hero__card--work">
                    <UiSlotPhoto
                        :photo="heroWork.photo"
                        :alt="heroWork.alt"
                        sizes="(min-width: 1024px) 24vw, 50vw"
                        :label="heroWork.title"
                        note="Работа крупно"
                        is-cover
                    />
                </div>
                <p class="hero__badge">{{ PROFILE.place }}</p>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.hero {
    @include padding('top', 10);
    @include padding('bottom', 20);

    &__inner {
        display: grid;
        align-items: center;
        row-gap: $space-2xl;

        @include desktop {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: $space-2xl;
        }
    }

    &__text {
        @include column($space-lg);
    }

    &__title {
        max-width: 11ch;
        font-size: $text-display;
        letter-spacing: $tracking-display;
        line-height: 0.92;
    }

    &__lead {
        max-width: 26ch;
        font-size: $text-lead;
    }

    &__actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: $space-sm;
    }

    &__stage {
        position: relative;
        height: $hero-stage-height-mobile;

        @include tablet {
            height: $hero-stage-height;
        }
    }

    &__card {
        position: absolute;
        border: 10px solid $color-paper-2;
        overflow: hidden;
        border-radius: $radius;
        box-shadow: $shadow-lift;
        animation: float $float-cycle ease-in-out infinite;

        .ui-photo,
        .ui-plate {
            border-radius: 0;
        }

        &--work {
            --tilt: -7deg;

            z-index: $z-raised;
            top: 50%;
            left: 0;
            width: 38%;
            height: 38%;
            border-width: 6px;

            @include tablet {
                top: 34%;
                width: 40%;
                height: 54%;
                border-width: 10px;
            }
        }
    }

    &__mirror {
        position: absolute;
        top: 0;
        right: 0;
        width: 80%;
        height: 88%;

        @include tablet {
            width: 66%;
            height: 86%;
        }
    }

    &__badge {
        --tilt: -3deg;

        position: absolute;
        z-index: $z-raised;
        bottom: 0;
        left: 8%;
        border-radius: $radius-pill;
        white-space: nowrap;
        background-color: $color-paper-2;
        box-shadow: $shadow-card;
        animation: float $float-cycle ease-in-out infinite;
        animation-delay: -4.6s;

        @include title($text-md);
        @include padding('x', 5);
        @include padding('y', 3);

        @include tablet {
            left: 18%;
            font-size: $text-lg;

            @include padding('x', 6);
            @include padding('y', 4);
        }
    }
}
</style>
