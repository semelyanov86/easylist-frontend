<template>
    <v-card
        :title="$t('account.edit-password-title')"
        :subtitle="$t('account.edit-password-subtitle')"
    >
        <v-card-text>
            <account-password-form
                @cancel="$emit('cancel')"
            ></account-password-form>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import AccountPasswordForm from '@/components/molecules/AccountPasswordForm.vue'

export default {
    name: 'AccountPasswordCard',
    emits: ['cancel'],
    components: { AccountPasswordForm },
}
</script>

<style scoped></style>
