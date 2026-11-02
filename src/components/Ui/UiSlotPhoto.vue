<script setup>
import {computed} from 'vue';
import {hasPhoto} from '@/core/helpers/photos';

import UiPhoto from '@/components/Ui/UiPhoto.vue';
import UiPlate from '@/components/Ui/UiPlate.vue';

const props = defineProps({
    photo: {type: String, required: true},
    alt: {type: String, required: true},
    label: {type: String, required: true},
    note: {type: String, default: 'Здесь будет фото'},
    ratio: {type: Number, default: null},
    sizes: {type: String, default: '50vw'},
    isEager: {type: Boolean, default: false},
    isCover: {type: Boolean, default: false},
});

const isPhotoReady = computed(() => hasPhoto(props.photo));
</script>

<template>
    <UiPhoto
        v-if="isPhotoReady"
        class="ui-slot-photo"
        :name="photo"
        :alt="alt"
        :sizes="sizes"
        :is-eager="isEager"
        :is-cover="isCover"
    />
    <UiPlate
        v-else
        class="ui-slot-photo"
        :label="label"
        :note="note"
        :ratio="ratio"
        :is-fill="isCover"
    />
</template>
