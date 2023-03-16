<template>
    <v-responsive class="mt-3">
        <form v-bind="$attrs" @submit.prevent="submit">
            <atom-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                :label="$t('account.email')"
            ></atom-text-field>
            <atom-btn color="primary" class="me-4" type="submit">
                {{ $t('login.submit') }}
            </atom-btn>

            <atom-btn @click="handleReset"> {{ $t('login.clear') }} </atom-btn>
        </form>
    </v-responsive>
</template>

<script lang="ts">
import AtomTextField from '@/components/atoms/AtomTextField.vue'
import AtomBtn from '@/components/atoms/AtomBtn.vue'
import { defineComponent } from 'vue'
import { useField, useForm } from 'vee-validate'

export default defineComponent({
    name: 'RestoreForm',
    components: { AtomBtn, AtomTextField },
    emits: ['doRestore'],
    setup(_, { emit }) {
        const { handleSubmit, handleReset } = useForm({
            validationSchema: {
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
        const email = useField('email')

        const submit = handleSubmit((values) => {
            emit('doRestore', values)
        })

        return {
            email,
            submit,
            handleReset,
        }
    },
})
</script>

<style scoped></style>
