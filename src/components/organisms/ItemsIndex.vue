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
                {{ $t('items.items-in') }} {{ storage.selectedList?.name }}
            </template>
            <template v-slot:actions>
                <atom-icon-btn
                    atom-icon="mdi-plus"
                    color="default"
                    @click="createItem"
                ></atom-icon-btn>
                <items-toolbar-submenu
                    @uncross-items="onUncrossItems"
                    @delete-crossed="onDeleteCrossed"
                    @delete-all="onDeleteAllItems"
                    @send-email-form="$emit('sendEmailForm')"
                    @send-tg="handleSendTg"
                    @make-public-form="$emit('makePublicForm')"
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
import {
    deleteAllItems,
    deleteCrossedItems,
    sendToAssist,
    uncrossItems,
} from '@/services/Api'
import { AxiosError } from 'axios'
import { mapItemsDataFromResponse } from '@/services/ResponseDataMapper'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'ItemsIndex',
    emits: [
        'loadMoreItems',
        'itemsSearch',
        'createItem',
        'editItem',
        'sendEmailForm',
        'makePublicForm',
    ],
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
        const { t } = useI18n()

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

        function onDeleteCrossed() {
            storage.deleteCrossed()
            if (storage.selectedList) {
                deleteCrossedItems(storage.selectedList.id).catch(
                    (error: AxiosError) => {
                        storage.setErrorFromAxios(error)
                    }
                )
            }
        }

        function onDeleteAllItems() {
            storage.setDefaultItems()
            if (storage.selectedList) {
                storage.setItemCounter(storage.selectedList.id, 0)
                deleteAllItems(storage.selectedList.id).catch(
                    (error: AxiosError) => {
                        storage.setErrorFromAxios(error)
                    }
                )
            }
        }

        function handleSendTg() {
            const listmodel = storage.selectedList
            if (!listmodel) {
                return
            }
            storage.loading = true
            let userId = storage.user.id
            if (typeof userId === 'string') {
                userId = BigInt(parseInt(userId))
            }
            sendToAssist(listmodel, Number(userId))
                .then((response) => {
                    storage.loading = false
                    storage.message = t('items.send-tg-done')
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    storage.loading = false
                })
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
            onDeleteCrossed,
            onDeleteAllItems,
            handleSendTg,
        }
    },
})
</script>

<style scoped></style>
