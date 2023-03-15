<template>
    <v-card>
        <atom-card-title>{{ $t('items.create-title') }}</atom-card-title>
        <edit-item-form
            @save-item="saveItem"
            @close-item="closeItem"
            :item-id="itemId"
        ></edit-item-form>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import AtomCardTitle from '@/components/atoms/AtomCardTitle.vue'
import EditItemForm from '@/components/molecules/EditItemForm.vue'

export default defineComponent({
    name: 'EditItemCard',
    emits: ['saveItem', 'closeItem'],
    props: {
        itemId: Number,
    },
    components: {
        AtomCardTitle,
        EditItemForm,
    },
    setup(props, { emit }) {
        function saveItem(itemModel: ItemInterface) {
            emit('saveItem', itemModel)
        }
        function closeItem() {
            emit('closeItem')
        }
        return { saveItem, closeItem }
    },
})
</script>

<style scoped></style>
