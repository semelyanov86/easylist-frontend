<template>
    <v-dialog
        v-model="dialog"
        :max-width="options.width"
        :style="{ zIndex: options.zIndex }"
        @keydown.esc="cancel"
    >
        <v-card>
            <v-toolbar dark :color="options.color" dense flat>
                <v-toolbar-title class="white--text">{{
                    title
                }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text v-show="!!message" class="pa-4">{{
                message
            }}</v-card-text>
            <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <v-btn color="primary darken-1" text @click.native="agree"
                    >Yes</v-btn
                >
                <v-btn color="grey" text @click.native="cancel">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import OptionsConfirm from '@/types/OptionsConfirm'

export default defineComponent({
    setup() {
        const state = reactive({
            dialog: false,
            resolve: (val: boolean) => {},
            reject: (val: boolean) => {},
            message: '',
            title: '',
            options: {
                color: 'primary',
                width: 290,
                zIndex: 200,
            },
        })

        const open = (
            title: string,
            message: string,
            options: OptionsConfirm
        ) => {
            state.dialog = true
            state.title = title
            state.message = message
            state.options = Object.assign(state.options, options)
            return new Promise<boolean>((resolve, reject) => {
                state.resolve = resolve
                state.reject = reject
            })
        }

        const agree = () => {
            state.resolve(true)
            state.dialog = false
        }

        const cancel = () => {
            state.resolve(false)
            state.dialog = false
        }

        return {
            ...toRefs(state),
            open,
            agree,
            cancel,
        }
    },
})
</script>

<style scoped></style>
