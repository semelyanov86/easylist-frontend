<template>
  <v-list item-title="name" item-props lines="three">
    <v-list-item
      v-for="item in items"
      :key="item.id"
      :title="item.name"
      :subtitle="item.description"
    >
      <template v-slot:prepend="{ is_done }">
        <v-list-item-action start>
          <v-checkbox-btn
            :model-value="is_done"
          ></v-checkbox-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import {PropType} from "vue";
import ItemInterface from "@/types/ItemInterface";

export default {
  name: "ItemsList",
  props: {
    items: Array as PropType<ItemInterface[]>
  }
}
</script>

<style scoped>

</style>
