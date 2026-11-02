<script setup>
import {computed} from 'vue';
import {useEraseMask} from '@/composables/useEraseMask';
import {SAMPLE_CASE} from '@/core/data/works';
import {SECTION_IDS} from '@/core/constants';
import {typograph} from '@/core/utils/typograph';

import UiSlotPhoto from '@/components/Ui/UiSlotPhoto.vue';
import UiSection from '@/components/Ui/UiSection.vue';

const PLATE_RATIO = 1.25;

const {maskUrl, pad, erasedShare, reset, handlePointerMove, handlePointerLeave} = useEraseMask();

const afterStyle = computed(() =>
    maskUrl.value ? {maskImage: `url(${maskUrl.value})`, webkitMaskImage: `url(${maskUrl.value})`} : null,
);
const padStyle = computed(() => ({translate: `${pad.value.x}px ${pad.value.y}px`, '--stain': erasedShare.value}));
const isTouched = computed(() => erasedShare.value > 0);
</script>

<template>
    <UiSection
        :id="SECTION_IDS.case"
        class="case"
        :title="SAMPLE_CASE.title"
        :lead="SAMPLE_CASE.note"
    >
        <div class="case__body">
            <div class="case__demo">
                <div
                    class="case__stage"
                    @pointermove="handlePointerMove"
                    @pointerdown="handlePointerMove"
                    @pointerleave="handlePointerLeave"
                >
                    <UiSlotPhoto
                        class="case__photo case__photo--before"
                        :photo="SAMPLE_CASE.beforePhoto"
                        alt="До макияжа"
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        :label="SAMPLE_CASE.beforeSlot"
                        note="До: чистая кожа"
                        :ratio="PLATE_RATIO"
                    />
                    <div
                        class="case__after"
                        :style="afterStyle"
                    >
                        <UiSlotPhoto
                            class="case__photo case__photo--after"
                            :photo="SAMPLE_CASE.afterPhoto"
                            alt="После макияжа"
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            :label="SAMPLE_CASE.afterSlot"
                            note="После: готовый образ"
                            :ratio="PLATE_RATIO"
                        />
                    </div>
                    <span
                        :class="['case__pad', {'case__pad--visible': pad.isVisible}]"
                        :style="padStyle"
                        aria-hidden="true"
                    />
                    <span
                        :class="['case__hint', {'case__hint--hidden': isTouched}]"
                        aria-hidden="true"
                    >
                        проведите ватным диском — макияж сотрётся
                    </span>
                </div>
                <button
                    type="button"
                    class="case__reset"
                    @click="reset"
                >
                    Вернуть макияж
                </button>
            </div>
            <ol class="case__steps">
                <li
                    v-for="step in SAMPLE_CASE.steps"
                    :key="step.id"
                    class="case__step"
                >
                    <h3 class="case__step-title">{{ typograph(step.title) }}</h3>
                    <p class="case__step-text">{{ typograph(step.text) }}</p>
                </li>
            </ol>
        </div>
    </UiSection>
</template>

<style lang="scss" src="./CaseSection.scss"></style>
