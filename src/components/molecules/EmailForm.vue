<template>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field
                        :label="$t('items.email') + '*'"
                        required
                        autofocus
                        v-model="email"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <small>{{ $t('general.fields-required') }}</small>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeForm">
            {{ $t('general.close') }}
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="sendEmail">
            {{ $t('items.send') }}
        </v-btn>
    </v-card-actions>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'EmailForm',
    emits: ['sendEmail', 'closeForm'],
    props: {
        defaultEmail: String,
    },
    setup(props, { emit }) {
        const email = ref<string>('')
        onMounted(() =>
            props.defaultEmail
                ? (email.value = props.defaultEmail)
                : (email.value = '')
        )
        function sendEmail() {
            emit('sendEmail', email.value)
        }
        function closeForm() {
            emit('closeForm')
        }
        return {
            email,
            sendEmail,
            closeForm,
        }
    },
})
</script>

<style scoped></style>
