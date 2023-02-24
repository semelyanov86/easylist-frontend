<template>
    <v-overlay
        :model-value="storage.loading"
        class="align-center justify-center"
    >
        <v-progress-circular
            color="primary"
            indeterminate
            size="64"
        ></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'

export default {
    name: 'AtomLoadingIndicator',
    setup() {
        const storage = useAppStore()
        return { storage }
    },
}
</script>

<style scoped></style>
