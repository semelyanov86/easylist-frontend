<template>
    <div class="fill-height">
        <v-btn prepend-icon="mdi-cached" color="info" block>
            <slot></slot>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'AtomLoadMore',
}
</script>

<style scoped></style>
