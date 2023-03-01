<template>
    <v-card class="mx-auto">
        <toolbar :showBackButton="true">List of items</toolbar>

        <items-list @load-more-items="onLoadMoreItems" />
    </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import ItemsList from '@/components/molecules/ItemsList.vue'
import Toolbar from '@/components/molecules/Toolbar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ItemsIndex',
    emits: ['loadMoreItems'],
    components: { ItemsList, Toolbar },
    setup(_, { emit }) {
        function onLoadMoreItems() {
            emit('loadMoreItems')
        }
        return { onLoadMoreItems }
    },
})
</script>

<style scoped></style>
