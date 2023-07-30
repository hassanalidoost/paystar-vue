import { defineStore } from "pinia"

export const userStore = defineStore('user', {

    state: () => ({
        id: null,
        name: null,
        email: null,
        token: null,
    }),
    actions: {
        async setUserDetails(res){
            this.$state.id = res.user.id
            this.$state.name = res.user.name
            this.$state.email = res.user.email
            this.$state.token = res.token
        },

        clearUser(){
            this.$state.id = null
            this.$state.name = null
            this.$state.email = null
            this.$state.token = null
        },
    },
    persist: true,
})
