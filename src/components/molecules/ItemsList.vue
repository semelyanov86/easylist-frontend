<template>
    <confirm ref="veeConfirmRef"></confirm>
    <v-list item-title="name" item-props lines="three">
        <draggable
            item-key="id"
            v-model="storage.getItems"
            @start="isDragging = true"
            @end="isDragging = false"
            @change="dropItem"
            handle=".handle"
        >
            <template #item="{ element }">
                <v-list-item
                    :key="element.id"
                    :subtitle="element.description"
                    :class="{ 'bg-blue-lighten-4': element.is_starred }"
                >
                    <template v-slot:title>
                        <v-list-item-title class="text-wrap">{{
                            getItemName(element)
                        }}</v-list-item-title>
                    </template>
                    <template v-slot:subtitle>
                        <v-list-item-subtitle class="text-wrap">{{
                            element.description
                        }}</v-list-item-subtitle>
                    </template>
                    <template v-slot:prepend>
                        <v-list-item-action start>
                            <v-checkbox-btn
                                @change="changeDoneValue($event, element)"
                                :model-value="element.is_done"
                            ></v-checkbox-btn>
                            <v-avatar
                                :image="getAvatar(element)"
                                class="handle"
                            ></v-avatar>
                        </v-list-item-action>
                    </template>
                    <template v-slot:append>
                        <item-submenu
                            @edit-item="editItem(element.id)"
                            @move-item="moveItem(element)"
                            @copy-item="onCopyItem(element)"
                            @star-item="onStarItem(element)"
                            @delete-item="onDeleteItem(element)"
                        ></item-submenu>
                    </template>
                </v-list-item>
            </template>
        </draggable>
        <atom-load-more
            v-if="storage.itemsTotal > storage.items.length"
            @click="loadMoreItems"
            >{{ $t('general.load-more') }}</atom-load-more
        >
    </v-list>
</template>

<script lang="ts">
import { computed, PropType, ref } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import { useAppStore } from '@/store/app'
import AtomLoadMore from '@/components/atoms/AtomLoadMore.vue'
import { defineComponent } from 'vue'
import {
    deleteItem,
    setItemDoneOrUndone,
    starOrUnstarItem,
    updateOrderOfItem,
    updateOrderOfList,
} from '@/services/Api'
import { AxiosError } from 'axios'
import MovedInterface from '@/types/MovedInterface'
import draggable from 'vuedraggable'
import ItemSubmenu from '@/components/molecules/ItemSubmenu.vue'
import Confirm from '@/components/organisms/Confirm.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'ItemsList',
    emits: ['loadMoreItems', 'editItem', 'moveItem', 'copyItem'],
    props: {},
    components: {
        ItemSubmenu,
        AtomLoadMore,
        draggable,
        Confirm,
    },
    setup(_, { emit }) {
        const storage = useAppStore()
        const isDragging = ref(false)
        const veeConfirmRef = ref<InstanceType<typeof Confirm>>()
        const { t } = useI18n()

        function loadMoreItems() {
            emit('loadMoreItems')
        }
        function getItemName(item: ItemInterface): string {
            if (item.quantity > 0) {
                return (
                    item.name +
                    ' (' +
                    item.quantity +
                    ' ' +
                    item.quantity_type +
                    ')'
                )
            }
            return item.name
        }
        function getAvatar(item: ItemInterface): string {
            if (item.file) {
                return import.meta.env.VITE_BASIC_URL + '/' + item.file
            }
            return ''
        }

        function changeDoneValue(event: Event, item: ItemInterface) {
            const isChecked = event.target?.checked as boolean
            setItemDoneOrUndone(item, isChecked).catch((error) => {
                console.log(error)
                storage.setErrorFromAxios(error)
                storage.loading = false
            })
            storage.markItemDoneOrUndone(item, isChecked)
        }

        function dropItem(moved: MovedInterface<ItemInterface>) {
            updateOrderOfItem(moved)
                .then(
                    () =>
                        (storage.message =
                            t('items.item') +
                            ' ' +
                            moved.moved.element.name +
                            ' ' +
                            t('items.moved'))
                )
                .catch((error: AxiosError) => {
                    storage.setErrorFromAxios(error)
                })
        }

        function editItem(id: number) {
            emit('editItem', id)
        }

        function moveItem(item: ItemInterface) {
            emit('moveItem', item)
        }

        function onCopyItem(item: ItemInterface) {
            emit('copyItem', item)
        }

        function onStarItem(item: ItemInterface) {
            starOrUnstarItem(item)
                .then(function () {
                    const starMsg = item.is_starred
                        ? t('items.starred')
                        : t('items.not-starred')
                    storage.message = t('items.item-now') + ' ' + starMsg
                    storage.starOrUnstarItem(item)
                })
                .catch((error: AxiosError) => {
                    storage.setErrorFromAxios(error)
                })
        }

        function onDeleteItem(item: ItemInterface) {
            veeConfirmRef.value
                ?.open(t('items.delete'), t('items.delete-msg'), {
                    color: 'red',
                    width: 290,
                    zIndex: 200,
                })
                .then((confirm: boolean) => {
                    if (confirm) {
                        storage.loading = true
                        if (confirm) {
                            deleteItem(item)
                                .then(function () {
                                    storage.message =
                                        t('items.item') +
                                        ' ' +
                                        item.name +
                                        ' ' +
                                        t('items.delete-success')
                                    storage.deleteItem(item)
                                    storage.decreaseItemCounter(item.list_id)
                                    storage.itemsTotal--
                                    storage.loading = false
                                })
                                .catch((error: AxiosError) => {
                                    storage.setErrorFromAxios(error)
                                    storage.loading = false
                                })
                        }
                    }
                })
        }

        return {
            storage,
            loadMoreItems,
            getItemName,
            getAvatar,
            changeDoneValue,
            isDragging,
            dropItem,
            editItem,
            moveItem,
            onCopyItem,
            onStarItem,
            onDeleteItem,
            veeConfirmRef,
        }
    },
})
</script>

<style scoped></style>
