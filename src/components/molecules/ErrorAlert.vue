<template>
  <v-alert
    dismissible
    title="There was an error"
    :text="text"
    type="error"
  ></v-alert>
</template>

<script lang="ts">
export default {
  name: "ErrorAlert",
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>
