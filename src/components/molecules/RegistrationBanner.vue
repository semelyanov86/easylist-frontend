<template>
    <v-row justify="center">
        <v-col xl="5" cols="8">
            <div>
                <h2 class="text-h4 text-default font-weight-medium">
                    {{ $t('login.page-name') }}
                </h2>
                <atom-text-six :text="$t('login.banner-text')" />
                <atom-btn href="https://sergeyem.ru/contact" target="_blank">
                    {{ $t('login.learn-more') }}
                </atom-btn>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import AtomBtn from '@/components/atoms/AtomBtn.vue'
import AtomTextSix from '@/components/atoms/AtomTextSix.vue'

export default {
    name: 'RegistrationBanner',
    components: {
        AtomBtn,
        AtomTextSix,
    },
}
</script>

<style scoped></style>
