<template>
    <v-card-actions>
        <v-btn @click="$emit('changePassword')">{{
            $t('account.change-password')
        }}</v-btn>
        <v-btn @click="$emit('changeName')">{{
            $t('account.change-name')
        }}</v-btn>
    </v-card-actions>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AccountActions',
    emits: ['changePassword', 'changeName'],
})
</script>

<style scoped></style>
