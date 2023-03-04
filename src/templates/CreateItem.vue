<template>
    <v-dialog v-model="isItemOpen" activator="parent" width="auto">
        <edit-item-card
            @save-item="saveItem"
            @close-item="closeItem"
            :item-id="itemId"
        ></edit-item-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { defineComponent } from 'vue'
import EditItemCard from '@/components/organisms/EditItemCard.vue'
import { useAppStore } from '@/store/app'
import { createOrUpdateItem } from '@/services/Api'
import { mapItemFromResponseAttributes } from '@/services/ResponseDataMapper'
import ItemInterface from '@/types/ItemInterface'

export default defineComponent({
    name: 'CreateItem',
    components: { EditItemCard },
    emits: ['closeItemDialog'],
    props: {
        itemDialog: Boolean,
        itemId: Number,
    },
    setup(props, { emit }) {
        const storage = useAppStore()

        const isItemOpen = computed({
            get: () => props.itemDialog,
            set: (value) => value,
        })

        function saveItem(item: ItemInterface) {
            storage.loading = true
            createOrUpdateItem(item)
                .then((response) => {
                    const item = mapItemFromResponseAttributes(
                        response.data.data
                    )
                    storage.addItem(item)
                    storage.loading = false
                    closeItem()
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    closeItem()
                    storage.loading = false
                })
        }

        function closeItem() {
            emit('closeItemDialog', false)
        }

        return {
            isItemOpen,
            saveItem,
            closeItem,
        }
    },
})
</script>

<style scoped></style>
