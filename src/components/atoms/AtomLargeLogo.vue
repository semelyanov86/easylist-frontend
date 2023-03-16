<template>
    <atom-img
        :src="logoUrl"
        :lazy-src="logoUrl"
        aspect-ratio="1"
        height="125"
        width="125"
        style="align-content: center"
    >
    </atom-img>
</template>

<script lang="ts">
import { computed } from 'vue'
import AtomImg from '@/components/atoms/AtomImg.vue'

export default {
    name: 'AtomLargeLogo',
    components: { AtomImg },
    setup() {
        const logoUrl = computed(
            () => import.meta.env.VITE_BASIC_URL + '/static/img/logo-light.svg'
        )
        return { logoUrl }
    },
}
</script>

<style scoped></style>
