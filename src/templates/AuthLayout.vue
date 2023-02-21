<template>
    <v-layout>
        <v-row
            no-gutters
            :style="{ height: height + 'px', overflow: 'hidden' }"
        >
            <v-container>
                <error-alert
                    v-if="storage.error"
                    :text="storage.error"
                    @click="storage.removeError()"
                    v-model="alert"
                />
            </v-container>
            <v-col
                lg="7"
                xl="6"
                cols="12"
                class="bg-primary d-none d-md-flex align-center justify-center"
            >
                <v-container>
                    <registration-banner></registration-banner>
                </v-container>
            </v-col>
            <v-col
                lg="5"
                xl="6"
                cols="12"
                class="d-flex align-center"
                :style="{ height: height + 60 + 'px', overflow: 'auto' }"
            >
                <v-container class="spacing-playground tw-pl-10 tw-pr-10" fluid>
                    <slot></slot>
                </v-container>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ErrorAlert from '@/components/molecules/ErrorAlert.vue'
import { useWindowSize } from '@vueuse/core'
import RegistrationBanner from '@/components/molecules/RegistrationBanner.vue'
import { useAppStore } from '@/store/app'

export default {
    name: 'AuthLayout',
    components: {
        RegistrationBanner,
        ErrorAlert,
    },
    setup() {
        const storage = useAppStore()
        const { height } = useWindowSize()

        return {
            storage,
            height,
            alert,
        }
    },
}
</script>

<style scoped></style>
