<template>
    <v-btn color="default" prepend-icon="mdi-dots-vertical" variant="text">
        <v-menu activator="parent">
            <v-list>
                <v-list-item @click="hideCompleted">
                    <v-list-item-title>{{
                        storage.hideCompleted
                            ? 'Show completed items'
                            : 'Hide completed items'
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="storage.onlyStarred = !storage.onlyStarred"
                >
                    <v-list-item-title>{{
                        storage.onlyStarred
                            ? 'Show All items'
                            : 'Only starred items'
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="uncrossItems">
                    <v-list-item-title> Uncross All Items </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('deleteCrossed')">
                    <v-list-item-title>
                        Delete Crossed Items
                    </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('deleteAll')">
                    <v-list-item-title> Delete All Items </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('sendEmailForm')">
                    <v-list-item-title> Send List By Email </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('makePublic')">
                    <v-list-item-title> Make List Public </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-btn>
</template>

<script>
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import { useAppStore } from '@/store/app'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ItemsToolbarSubmenu',
    components: {},
    emits: [
        'uncrossItems',
        'deleteCrossed',
        'deleteAll',
        'sendEmailForm',
        'makePublic',
    ],
    setup(_, { emit }) {
        const storage = useAppStore()
        function hideCompleted() {
            storage.hideCompleted = !storage.hideCompleted
        }
        function uncrossItems() {
            emit('uncrossItems')
        }
        return {
            storage,
            hideCompleted,
            uncrossItems,
        }
    },
})
</script>

<style scoped></style>
