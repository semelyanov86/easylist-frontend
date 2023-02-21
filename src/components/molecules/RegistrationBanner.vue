<template>
    <v-row justify="center">
        <v-col xl="5" cols="8">
            <div>
                <h2 class="text-h4 text-white font-weight-medium">
                    EasyList App
                </h2>
                <atom-text-six
                    text="Registration to this service is disabled by default. If you want to use this service, write to administrator"
                />
                <atom-btn> Learn More </atom-btn>
            </div>
        </v-col>
    </v-row>
</template>

<script>
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
