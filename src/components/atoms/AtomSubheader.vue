<template>
    <v-list-subheader inset v-bind="$attrs">{{ text }}</v-list-subheader>
</template>

<script lang="ts">
export default {
    name: 'AtomSubheader',
    props: {
        text: String,
    },
}
</script>

<style scoped></style>
