<template>
    <v-btn
        color="default"
        variant="text"
        :icon="isActive ? 'mdi-star' : 'mdi-star-outline'"
        @click="$emit('showStarred')"
    ></v-btn>
</template>

<script lang="ts">
export default {
    name: 'AtomStarBtn',
    emits: ['showStarred'],
    props: {
        isActive: Boolean,
    },
    components: {},
}
</script>

<style scoped></style>
