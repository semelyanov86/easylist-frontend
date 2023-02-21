import { useAppStore } from '@/store/app'
import router from '@/router'

const Security = {
    // make sure user is authenticated
    requireToken: function () {
        const storage = useAppStore()
        if (storage.token === '') {
            router.push({ name: 'Login' })
            return false
        }
    },

    isAuthenticated: function (): boolean {
        const storage = useAppStore()
        return storage.token !== ''
    },
}
export default Security
