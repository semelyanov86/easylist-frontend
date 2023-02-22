<template>
  <v-list :items="items" item-title="name" item-props lines="three">
    <template v-slot:subtitle="{ description }">
      <div>{{ description }}</div>
    </template>
    <template v-slot:prepend="{ is_done }">
      <v-list-item-action start>
        <v-checkbox-btn
          :model-value="is_done"
        ></v-checkbox-btn>
      </v-list-item-action>
    </template>
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
