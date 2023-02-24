<template>
    <v-toolbar-title v-bind="$attrs"><slot></slot></v-toolbar-title>
</template>

<script lang="ts">
export default {
    name: 'AtomToolbarTitle',
    props: {
        text: String,
    },
}
</script>

<style scoped></style>
