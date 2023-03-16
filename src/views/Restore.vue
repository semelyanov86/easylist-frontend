<template>
    <AuthLayout>
        <restore-block></restore-block>
    </AuthLayout>
</template>

<script>
import AuthLayout from '@/templates/AuthLayout.vue'
import RestoreBlock from '@/components/organisms/RestoreBlock.vue'

export default {
    name: 'Restore',
    components: { RestoreBlock, AuthLayout },
}
</script>

<style scoped></style>
