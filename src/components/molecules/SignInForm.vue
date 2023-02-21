<template>
    <form v-bind="$attrs" @submit.prevent="submit">
        <atom-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
        ></atom-text-field>
        <atom-text-field
            id="password"
            type="password"
            v-model="password.value.value"
            :counter="7"
            :error-messages="password.errorMessage.value"
            label="Password"
        ></atom-text-field>
        <atom-btn color="primary" class="me-4" type="submit"> submit </atom-btn>

        <atom-btn @click="handleReset"> clear </atom-btn>
    </form>
</template>

<script lang="ts">
import AtomTextField from '@/components/atoms/AtomTextField.vue'
import AtomBtn from '@/components/atoms/AtomBtn.vue'
import { useField, useForm } from 'vee-validate'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SignInForm',
    emits: ['submit', 'do'],
    components: {
        AtomTextField,
        AtomBtn,
    },
    setup(props: any, { emit }) {
        const { handleSubmit, handleReset } = useForm({
            validationSchema: {
                password(value: string) {
                    if (value?.length > 7) return true

                    return 'Password must be at least 7 digits.'
                },
                email(value: string) {
                    if (
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                        )
                    )
                        return true

                    return 'Must be a valid e-mail.'
                },
            },
        })
        const password = useField('password')
        const email = useField('email')

        const submit = handleSubmit((values) => {
            emit('do', values)
        })

        return {
            password,
            email,
            submit,
            handleReset,
        }
    },
})
</script>

<style scoped></style>
