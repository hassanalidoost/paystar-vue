<script setup>
import {onMounted, onUnmounted, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import ModalLoader from "@/components/loader/ModalLoader.vue"
import {paymentStatusStore} from "@/stores/paymentStatusStore";
import {useToast} from "vue-toastification";

const route = useRoute()
const toast = useToast()
const isLoading = ref(false)
const paymentStore = paymentStatusStore()
const status = ref(null)
const orderId = ref(null)
const refNum = ref(null)
const transactionId = ref(null)
const cardNumber = ref(null)
const trackingCode = ref(null)
const message = ref(null)

watchEffect(async () => {
  isLoading.value = true
  await axios.get('/result/' + paymentStore.RefNum)
  .then((r) => {
    orderId.value = r.data.transaction.order_id
    refNum.value = r.data.transaction.ref_number
    cardNumber.value = r.data.transaction.card_number
    trackingCode.value = r.data.transaction.tracking_code
    transactionId.value = r.data.transaction.transaction_id
    status.value = r.data.transaction.status
    message.value = r.data.transaction.message
    isLoading.value = false
  })
  .catch((e) => {
    console.log(e)
  })
})



onUnmounted(() => {
  paymentStore.setPaymentStatusToNull()
})

</script>

<template>
  <ModalLoader :loading="isLoading" />
  <v-container>
    <v-layout class="flex justify-center items-center">
      <v-card class="result-card">
        <v-card-title class="text-center">Order Transaction Result</v-card-title>
        <v-card-text>
          <v-alert
              :type="status === 'successful' ? 'success' : 'error'"
              :icon="status === 'successful' ? 'mdi-check-circle' : 'mdi-alert-circle'"
          >
            {{ status === 'successful' ? 'Transaction successful!' : 'Transaction failed!' }}
          </v-alert>
          <p class="my-6" v-if="status === 'successful'">Your order has been successfully processed.</p>
          <p class="my-6" v-else>
            We apologize, but there was an issue with your transaction. ({{ message }})
            If the amount has been deducted from your account, it will be refunded to your account within the next 72 hours.
          </p>
          <div class="flex flex-col gap-2 border border-gray p-6 rounded-lg">
            <p>Your Order Id: {{ orderId }}</p>
            <p>Your Order Ref Number: {{ refNum }}</p>
            <p>Your Order Transaction Id: {{ transactionId }}</p>
            <p v-if="trackingCode">Your Order Tracking Code: {{ trackingCode }}</p>
          </div>

        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" to="/">Back to Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<style scoped>

</style>