// Utilities
import { defineStore } from 'pinia'
import UserInterface from '@/types/UserInterface'
import { AxiosError } from 'axios'
import ListInterface from '@/types/ListInterface'

export const useAppStore = defineStore('app', {
    state: () => ({
        token: <string>'',
        error: <string>'',
        errorAlert: <boolean>false,
        user: <UserInterface>{},
        selectedFolder: 1,
        selectedList: <ListInterface>{},
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUser(user: UserInterface) {
            this.user = user
        },
        setError(err: string) {
            this.errorAlert = true
            this.error = err
        },
        removeError() {
            this.errorAlert = false
            this.error = ''
        },
        setErrorFromAxios(err: AxiosError) {
            this.errorAlert = true
            // @ts-ignore
            if (err.response && err.response.data && err.response.data.errors) {
                // @ts-ignore
                const errors = err.response.data.errors[0]
                this.error = errors.detail
                return
            }
            this.error = err.message
        },
    },
})
