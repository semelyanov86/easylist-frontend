<template>
    <v-card>
        <atom-card-title>Public Link for current list</atom-card-title>
        <public-link-form
            @close-form="$emit('closePublicPopup')"
        ></public-link-form>
    </v-card>
</template>

<script lang="ts">
import AtomCardTitle from '@/components/atoms/AtomCardTitle.vue'
import { defineComponent } from 'vue'
import PublicLinkForm from '@/components/molecules/PublicLinkForm.vue'

export default defineComponent({
    name: 'PublicLinkCard',
    emits: ['closePublicPopup'],
    components: { PublicLinkForm, AtomCardTitle },
})
</script>

<style scoped></style>
