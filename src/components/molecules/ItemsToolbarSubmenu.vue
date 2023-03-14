<template>
    <v-btn color="default" prepend-icon="mdi-dots-vertical" variant="text">
        <v-menu activator="parent">
            <v-list>
                <v-list-item @click="hideCompleted">
                    <v-list-item-title>{{
                        storage.hideCompleted
                            ? $t('items.show-completed')
                            : $t('items.hide-completed')
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="storage.onlyStarred = !storage.onlyStarred"
                >
                    <v-list-item-title>{{
                        storage.onlyStarred
                            ? $t('items.show-all')
                            : $t('items.show-starred')
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="uncrossItems">
                    <v-list-item-title> {{$t('items.uncross-all')}} </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('deleteCrossed')">
                    <v-list-item-title>
                        {{$t('items.delete-crossed')}}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('deleteAll')">
                    <v-list-item-title> {{$t('items.delete-all')}} </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('sendEmailForm')">
                    <v-list-item-title> {{$t('items.send-by-email')}} </v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('makePublicForm')">
                    <v-list-item-title> {{$t('items.make-public')}} </v-list-item-title>
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
        'makePublicForm',
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
