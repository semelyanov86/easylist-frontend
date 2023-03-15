<template>
    <v-alert
        v-if="storage.message"
        closable
        icon="mdi-information"
        title="Data Updated!"
        :text="storage.message"
        type="info"
        @close="storage.message = ''"
        @click="storage.message = ''"
    ></v-alert>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'

export default {
    name: 'MessageAlert',
    setup() {
        const storage = useAppStore()
        return {
            storage,
        }
    },
}
</script>

<style scoped></style>
