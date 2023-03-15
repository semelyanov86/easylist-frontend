<template>
    <v-card
        :title="$t('account.edit-title')"
        :subtitle="$t('account.edit-subtitle')"
    >
        <v-card-text>
            <account-edit-form @cancel="$emit('cancel')"></account-edit-form>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import AccountEditForm from '@/components/molecules/AccountEditForm.vue'

export default {
    name: 'AccountEditCard',
    emits: ['cancel'],
    components: { AccountEditForm },
}
</script>

<style scoped></style>
