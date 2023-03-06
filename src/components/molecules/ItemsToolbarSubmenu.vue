<template>
    <v-btn color="default" prepend-icon="mdi-dots-vertical" variant="text">
        <v-menu activator="parent">
            <v-list>
                <v-list-item>
                    <v-list-item-title @click="hideCompleted">{{
                        storage.hideCompleted
                            ? 'Show completed items'
                            : 'Hide completed items'
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title
                        @click="storage.onlyStarred = !storage.onlyStarred"
                        >{{
                            storage.onlyStarred
                                ? 'Show All items'
                                : 'Only starred items'
                        }}</v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-menu>
    </v-btn>
</template>

<script>
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import { useAppStore } from '@/store/app'

export default {
    name: 'ItemsToolbarSubmenu',
    components: {},
    setup() {
        const storage = useAppStore()
        function hideCompleted() {
            storage.hideCompleted = !storage.hideCompleted
        }
        return {
            storage,
            hideCompleted,
        }
    },
}
</script>

<style scoped></style>
