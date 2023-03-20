<template>
    <div>
        <language-switcher></language-switcher>
        <router-link to="/help">
            <atom-btn
                class="hidden-sm-and-down font-weight-light"
                rel="noopener noreferrer"
                target="_blank"
                variant="text"
            >
                <atom-icon icon="mdi-view-dashboard" size="large" start />
                {{ $t('nav.help') }}
            </atom-btn>
        </router-link>
        <router-link to="/account">
            <atom-btn
                rel="noopener noreferrer"
                variant="text"
                class="hidden-sm-and-up"
            >
                <atom-icon icon="mdi-account" size="large" start />
            </atom-btn>
            <atom-btn
                rel="noopener noreferrer"
                variant="text"
                class="hidden-sm-and-down"
            >
                <atom-icon icon="mdi-account" size="large" start />
                {{ $t('nav.account') }}
            </atom-btn>
        </router-link>

        <atom-btn
            @click="$emit('signOut')"
            rel="noopener noreferrer"
            variant="text"
            class="hidden-sm-and-up"
        >
            <atom-icon icon="mdi-lock" size="large" start />
        </atom-btn>
        <atom-btn
            @click="$emit('signOut')"
            rel="noopener noreferrer"
            variant="text"
            class="hidden-sm-and-down"
        >
            <atom-icon icon="mdi-lock" size="large" start />
            {{ $t('nav.sign-out') }}
        </atom-btn>
    </div>
</template>

<script lang="ts">
import AtomBtn from '@/components/atoms/AtomBtn.vue'
import AtomIcon from '@/components/atoms/AtomIcon.vue'
import LanguageSwitcher from '@/components/molecules/LanguageSwitcher.vue'

export default {
    name: 'AppBarMenu',
    emits: ['signOut'],
    components: {
        AtomBtn,
        AtomIcon,
        LanguageSwitcher,
    },
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}
</style>
