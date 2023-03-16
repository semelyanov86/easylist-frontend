<template>
    <v-btn v-bind="$attrs">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">
export default {
    name: 'AtomBtn',
}
</script>

<style scoped></style>
