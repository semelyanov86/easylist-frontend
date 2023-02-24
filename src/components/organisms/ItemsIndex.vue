<template>
    <v-card class="mx-auto">
        <toolbar :showBackButton="true">List of items</toolbar>

        <items-list :items="items" />
    </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import ItemsList from '@/components/molecules/ItemsList.vue'
import Toolbar from '@/components/molecules/Toolbar.vue'

export default {
    name: 'ItemsIndex',
    components: { ItemsList, Toolbar },
    props: {
        items: Array as PropType<ItemInterface[]>,
    },
}
</script>

<style scoped></style>
