<template>
    <v-btn color="grey-lighten-1" :prepend-icon="atomIcon" variant="text">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">
export default {
    name: 'AtomIconBtn',
    props: {
        atomIcon: String,
    },
}
</script>

<style scoped></style>
