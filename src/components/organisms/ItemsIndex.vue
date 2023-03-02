<template>
    <v-card class="mx-auto">
        <toolbar
            @back-click="onClickBackButton"
            @search="onSearch"
            :showBackButton="true"
            >Items in {{ storage.selectedList?.name }}</toolbar
        >

        <items-list @load-more-items="onLoadMoreItems" />
    </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import ItemsList from '@/components/molecules/ItemsList.vue'
import Toolbar from '@/components/molecules/Toolbar.vue'
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/app'

export default defineComponent({
    name: 'ItemsIndex',
    emits: ['loadMoreItems', 'itemsSearch'],
    components: { ItemsList, Toolbar },
    setup(_, { emit }) {
        const storage = useAppStore()
        function onLoadMoreItems() {
            emit('loadMoreItems')
        }
        function onClickBackButton() {
            storage.setDefaultItems()
            storage.selectedList = null
        }

        function onSearch(value: string) {
            storage.itemsSearch = value
            emit('itemsSearch', value)
        }
        return { onLoadMoreItems, onClickBackButton, onSearch, storage }
    },
})
</script>

<style scoped></style>
