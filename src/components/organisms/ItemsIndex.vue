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
                <items-toolbar-submenu
                    @uncross-items="onUncrossItems"
                ></items-toolbar-submenu>
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
import ItemsToolbarSubmenu from '@/components/molecules/ItemsToolbarSubmenu.vue'
import { uncrossItems } from '@/services/Api'
import { AxiosError } from 'axios'

export default defineComponent({
    name: 'ItemsIndex',
    emits: ['loadMoreItems', 'itemsSearch', 'createItem', 'editItem'],
    components: {
        ItemsToolbarSubmenu,
        MoveItemCard,
        AtomIconBtn,
        ItemsList,
        Toolbar,
    },
    setup(_, { emit }) {
        const storage = useAppStore()
        const movingItem = ref<ItemInterface | null>(null)
        const copyMode = ref(false)

        function onUncrossItems() {
            storage.uncrossItemsInList()
            if (storage.selectedList) {
                uncrossItems(storage.selectedList.id).catch(
                    (error: AxiosError) => {
                        storage.setErrorFromAxios(error)
                    }
                )
            }
        }

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
            onUncrossItems,
        }
    },
})
</script>

<style scoped></style>
