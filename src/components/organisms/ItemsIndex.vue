<template>
    <v-card class="mx-auto">
        <toolbar
            @back-click="onClickBackButton"
            @search="onSearch"
            :showBackButton="true"
        >
            <template v-slot:header
                >Items in {{ storage.selectedList?.name }}</template
            >
            <template v-slot:actions>
                <atom-icon-btn
                    atom-icon="mdi-plus"
                    color="default"
                    @click="createItem"
                ></atom-icon-btn>
            </template>
        </toolbar>

        <items-list @load-more-items="onLoadMoreItems" @edit-item="editItem" />
    </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import ItemsList from '@/components/molecules/ItemsList.vue'
import Toolbar from '@/components/molecules/Toolbar.vue'
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/app'
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'

export default defineComponent({
    name: 'ItemsIndex',
    emits: ['loadMoreItems', 'itemsSearch', 'createItem', 'editItem'],
    components: { AtomIconBtn, ItemsList, Toolbar },
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

        function createItem() {
            emit('createItem')
        }
        function editItem(id: number) {
            emit('editItem', id)
        }
        return {
            onLoadMoreItems,
            onClickBackButton,
            onSearch,
            storage,
            createItem,
            editItem,
        }
    },
})
</script>

<style scoped></style>
