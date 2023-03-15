<template>
    <v-dialog v-model="isMoveCardOpen" activator="parent" width="auto">
        <v-card>
            <atom-card-title v-if="copyMode">{{
                $t('items.copy-header')
            }}</atom-card-title>
            <atom-card-title v-else>{{
                $t('items.copy-title')
            }}</atom-card-title>
            <move-item-form
                :item-model="itemModel"
                @close-move-item="$emit('closeMoveItem')"
                :copy-mode="copyMode"
            ></move-item-form>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import AtomCardTitle from '@/components/atoms/AtomCardTitle.vue'
import MoveItemForm from '@/components/molecules/MoveItemForm.vue'
import { computed, defineComponent, PropType, ref } from 'vue'
import ItemInterface from '@/types/ItemInterface'

export default defineComponent({
    name: 'MoveItemCard',
    emits: ['closeMoveItem'],
    props: {
        itemModel: Object as PropType<ItemInterface>,
        moveDialog: Boolean,
        copyMode: Boolean,
    },
    components: { MoveItemForm, AtomCardTitle },
    setup(props, { emit }) {
        const isMoveCardOpen = computed({
            get: () => props.moveDialog,
            set: (value) => closeMoveItem(),
        })
        function closeMoveItem() {
            emit('closeMoveItem')
        }
        return {
            closeMoveItem,
            isMoveCardOpen,
        }
    },
})
</script>

<style scoped></style>
