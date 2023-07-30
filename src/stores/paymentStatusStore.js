import { defineStore } from "pinia"

export const paymentStatusStore = defineStore('paymentStatus', {

    state: () => ({
        paymentStatus: null,
        RefNum: null
    }),

    actions: {
        setLastTransaction(refNum){
            this.RefNum = refNum
        },
        updatePaymentStatus() {
            this.paymentStatus = 'completed';
        },
        setPaymentStatusToNull() {
            this.paymentStatus = null;
            this.RefNum = null;
        },
    },
    persist: true,
})