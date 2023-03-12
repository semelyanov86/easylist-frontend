<template>
    <v-dialog v-model="isPublicOpen" activator="parent" width="100%">
        <public-link-card
            @close-public-popup="closePublicPopup"
        ></public-link-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/store/app'
import PublicLinkCard from '@/components/organisms/PublicLinkCard.vue'

export default defineComponent({
    name: 'MakePublicPopup',
    components: { PublicLinkCard },
    emits: ['closePublicPopup'],
    props: {
        publicDialog: Boolean,
    },
    setup(props, { emit }) {
        const storage = useAppStore()
        const isPublicOpen = computed({
            get: () => props.publicDialog,
            set: (value) => value,
        })

        function closePublicPopup() {
            emit('closePublicPopup', false)
        }

        return {
            storage,
            closePublicPopup,
            isPublicOpen,
        }
    },
})
</script>

<style scoped></style>
