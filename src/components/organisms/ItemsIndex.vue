<template>
    <move-item-card
        :item-model="movingItem"
        :move-dialog="movingItem != null"
        @close-move-item="movingItem = null"
        :copy-mode="copyMode"
    ></move-item-card>
    <v-card class="mx-auto">
        <toolbar
            @back-click="onClickBackButton"
            @search="onSearch"
            :showBackButton="true"
        >
            <template v-slot:header>
                Items in {{ storage.selectedList?.name }}
            </template>
            <template v-slot:actions>
                <atom-icon-btn
                    atom-icon="mdi-plus"
                    color="default"
                    @click="createItem"
                ></atom-icon-btn>
                <atom-star-btn
                    :is-active="storage.onlyStarred"
                    @showStarred="onShowStarred"
                ></atom-star-btn>
            </template>
        </toolbar>

        <items-list
            @load-more-items="onLoadMoreItems"
            @edit-item="editItem"
            @move-item="moveItem"
            @copy-item="copyItem"
        />
    </v-card>
</template>

<script lang="ts">
import { PropType, ref } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import ItemsList from '@/components/molecules/ItemsList.vue'
import Toolbar from '@/components/molecules/Toolbar.vue'
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/app'
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import MoveItemCard from '@/components/organisms/MoveItemCard.vue'
import AtomStarBtn from '@/components/atoms/AtomStarBtn.vue'

export default defineComponent({
    name: 'ItemsIndex',
    emits: ['loadMoreItems', 'itemsSearch', 'createItem', 'editItem'],
    components: { AtomStarBtn, MoveItemCard, AtomIconBtn, ItemsList, Toolbar },
    setup(_, { emit }) {
        const storage = useAppStore()
        const movingItem = ref<ItemInterface | null>(null)
        const copyMode = ref(false)

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
        function moveItem(item: ItemInterface) {
            copyMode.value = false
            movingItem.value = item
        }
        function copyItem(item: ItemInterface) {
            copyMode.value = true
            movingItem.value = item
        }

        function onShowStarred() {
            storage.onlyStarred = !storage.onlyStarred
        }
        return {
            onLoadMoreItems,
            onClickBackButton,
            onSearch,
            storage,
            createItem,
            editItem,
            moveItem,
            movingItem,
            copyItem,
            copyMode,
            onShowStarred,
        }
    },
})
</script>

<style scoped></style>
