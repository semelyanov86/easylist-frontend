<template>
    <v-progress-linear
        indeterminate
        color="yellow-darken-2"
        v-if="!initialValue"
    ></v-progress-linear>
    <a :href="initialValue" target="_blank">{{ initialValue }}</a>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'AtomClipboardField',
    props: {
        initialValue: String,
    },
})
</script>

<style scoped></style>
