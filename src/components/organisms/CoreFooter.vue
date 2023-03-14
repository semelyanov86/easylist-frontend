<template>
    <v-footer id="dashboard-core-footer">
        <v-container>
            <v-row align="center" no-gutters>
                <v-col
                    v-for="(link, i) in links"
                    :key="i"
                    class="hidden-sm-and-down text-center mb-sm-0 mb-5"
                    cols="auto"
                >
                    <a
                        :href="link.href"
                        class="mr-0 grey--text text--darken-3"
                        rel="noopener"
                        target="_blank"
                        v-text="link.text"
                    />
                </v-col>

                <v-spacer class="hidden-sm-and-down" />

                <v-col cols="12" md="auto">
                    <div
                        class="body-1 font-weight-light pt-6 pt-md-0 text-center"
                    >
                        &copy; 2023, {{$t('general.made-with')}}
                        <v-icon size="18"> mdi-heart </v-icon>
                        {{$t('general.by')}}
                        <a href="https://linkedin.com/in/sergeyem"
                            >{{ $t('general.autor') }}</a
                        >
                        {{$t('general.better-web')}}.
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";

export default {
    name: 'CoreFooter',
  setup() {
      const {t} = useI18n()
      const links = ref([
        {
          href: 'https://sergeyem.ru',
          text: t('general.about-me'),
        },
      ])
    return {links}
  }
}
</script>

<style scoped lang="sass">
#dashboard-core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
