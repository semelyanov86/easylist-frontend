<template>
    <v-card-text>
        <v-row>
            <v-col> {{ $t('account.id') }}: </v-col>
            <v-col>
                {{ user.id }}
            </v-col>
        </v-row>
        <v-row>
            <v-col> {{ $t('account.name') }}: </v-col>
            <v-col>
                {{ user.name }}
            </v-col>
        </v-row>
        <v-row>
            <v-col> {{ $t('account.email') }}: </v-col>
            <v-col>
                {{ user.email }}
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script lang="ts">
import { PropType } from 'vue'
import UserInterface from '@/types/UserInterface'

export default {
    name: 'AccountInfo',
    props: {
        user: Object as PropType<UserInterface>,
    },
}
</script>

<style scoped></style>
