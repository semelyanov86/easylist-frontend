<template>
    <v-card
        :title="$t('account.account-info')"
        :subtitle="$t('account.name-email')"
    >
        <account-info :user="storage.user"></account-info>
        <account-actions
            @change-password="$emit('changePassword')"
            @change-name="$emit('changeName')"
        ></account-actions>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/app'
import AccountInfo from '@/components/molecules/AccountInfo.vue'
import AccountActions from '@/components/molecules/AccountActions.vue'

export default defineComponent({
    name: 'AccountCard',
    components: { AccountActions, AccountInfo },
    emits: ['changePassword', 'changeName'],
    setup() {
        const storage = useAppStore()
        return { storage }
    },
})
</script>

<style scoped></style>
