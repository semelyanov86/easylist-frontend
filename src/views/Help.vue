<template>
<v-container>
  <messages-block></messages-block>
  <v-card :title="$t('help.header')" :subtitle="$t('help.subheader')" :text="$t('help.text') + '. email: se@sergeyem.ru, Telegram: @sergeyem'"></v-card>
</v-container>
</template>

<script lang="ts">
import MessagesBlock from "@/components/molecules/MessagesBlock.vue";

export default {
  name: "Help",
  components: {MessagesBlock}
}
</script>

<style scoped>

</style>
