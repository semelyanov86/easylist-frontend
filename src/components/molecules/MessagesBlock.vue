<template>
    <v-container v-if="storage.error">
        <error-alert
            :text="storage.error"
            @click="storage.removeError()"
            v-model="alert"
        />
    </v-container>
    <v-container>
        <message-alert></message-alert>
    </v-container>
    <atom-loading-indicator></atom-loading-indicator>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import MessageAlert from '@/components/molecules/MessageAlert.vue'
import AtomLoadingIndicator from '@/components/atoms/AtomLoadingIndicator.vue'
import ErrorAlert from '@/components/molecules/ErrorAlert.vue'

export default {
    name: 'MessagesBlock',
    components: { ErrorAlert, AtomLoadingIndicator, MessageAlert },
    setup() {
        const storage = useAppStore()
        return { storage }
    },
}
</script>

<style scoped></style>
