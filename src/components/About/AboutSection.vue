<script setup>
import {ABOUT_PALETTE, ABOUT_POINTS, MISSING_FACTS, PROFILE} from '@/core/data/profile';
import {SECTION_IDS} from '@/core/constants';
import {typograph} from '@/core/utils/typograph';

import UiSlotPhoto from '@/components/Ui/UiSlotPhoto.vue';

const [INTRO, ...PARAGRAPHS] = PROFILE.about;
</script>

<template>
    <section
        :id="SECTION_IDS.about"
        class="about"
        aria-labelledby="about-title"
    >
        <div class="about__inner container">
            <div class="about__visual">
                <div class="about__compact">
                    <div class="about__lid">
                        <div class="about__mirror">
                            <UiSlotPhoto
                                :photo="PROFILE.portraitPhoto"
                                :alt="PROFILE.portraitAlt"
                                sizes="(min-width: 1024px) 36vw, 90vw"
                                :label="PROFILE.portraitSlot"
                                :note="MISSING_FACTS.portrait"
                                is-cover
                            />
                            <span
                                class="about__shine"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <span
                        class="about__hinge"
                        aria-hidden="true"
                    />
                    <ul class="about__pans">
                        <li
                            v-for="pan in ABOUT_PALETTE"
                            :key="pan.id"
                            class="about__pan"
                        >
                            <span :class="['about__pan-color', `about__pan-color--${pan.id}`]" />
                            {{ pan.title }}
                        </li>
                    </ul>
                </div>
                <p
                    class="about__badge"
                    aria-hidden="true"
                >
                    {{ typograph(PROFILE.greeting) }}
                </p>
            </div>
            <div class="about__content">
                <h2
                    id="about-title"
                    class="about__title"
                >
                    {{ typograph(PROFILE.aboutTitle) }}
                </h2>
                <p class="about__intro lead">{{ typograph(INTRO) }}</p>
                <p
                    v-for="paragraph in PARAGRAPHS"
                    :key="paragraph"
                    class="about__paragraph"
                >
                    {{ typograph(paragraph) }}
                </p>
                <ul class="about__points">
                    <li
                        v-for="point in ABOUT_POINTS"
                        :key="point.id"
                        class="about__point"
                    >
                        <h3 class="about__point-title">{{ typograph(point.title) }}</h3>
                        <p class="about__point-text">{{ typograph(point.text) }}</p>
                    </li>
                </ul>
                <figure class="about__reviews">
                    <blockquote class="about__reviews-card">
                        <p class="about__reviews-text">Здесь будут ваши отзывы</p>
                        <p class="about__reviews-missing">{{ MISSING_FACTS.reviews }}</p>
                    </blockquote>
                </figure>
            </div>
        </div>
    </section>
</template>

<style lang="scss" src="./AboutSection.scss"></style>
