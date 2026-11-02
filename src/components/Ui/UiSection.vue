<script setup>
import {typograph} from '@/core/utils/typograph';
defineProps({
    id: {type: String, required: true},
    title: {type: String, required: true},
    eyebrow: {type: String, default: ''},
    lead: {type: String, default: ''},
});
</script>

<template>
    <section
        :id="id"
        class="ui-section"
        :aria-labelledby="`${id}-title`"
    >
        <div class="container">
            <header class="ui-section__head">
                <div class="ui-section__heading">
                    <p
                        v-if="eyebrow"
                        class="ui-section__eyebrow"
                    >
                        {{ eyebrow }}
                    </p>
                    <h2
                        :id="`${id}-title`"
                        class="ui-section__title"
                    >
                        {{ typograph(title) }}
                    </h2>
                </div>
                <p
                    v-if="lead"
                    class="ui-section__lead lead"
                >
                    {{ typograph(lead) }}
                </p>
                <slot name="aside" />
            </header>
            <slot />
        </div>
    </section>
</template>

<style lang="scss">
.ui-section {
    @include adaptive(padding-block, $section-gap-s);

    &__head {
        display: grid;
        align-items: end;
        row-gap: $space-md;

        @include margin('bottom', 14);

        @include desktop {
            @include twelve-columns;
        }
    }

    &__heading {
        container-type: inline-size;

        @include column($space-xs);

        @include desktop {
            grid-column: 1 / 7;
        }
    }

    &__eyebrow {
        @include label;
    }

    &__title {
        font-size: min(#{$text-section}, #{$fit-section});
    }

    &__lead {
        color: $color-ink-2;

        @include desktop {
            grid-column: 8 / 13;
        }
    }
}
</style>
