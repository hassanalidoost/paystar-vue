<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <h1 class="text-3xl">Please complete your order.</h1>
    <VBtn @click="verifyTransaction" color="primary" :to="{ name: 'result'}">Complete Order</VBtn>
    <p class="text-xl">You will be redirected to the results page in <span class="text-2xl text-blue-700">{{ countDown }}</span> seconds.</p>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {paymentStatusStore} from "@/stores/paymentStatusStore";

const route = useRoute()
const router = useRouter()
const time = ref(5)
const countDown = computed(() => time.value)
const paymentStore = paymentStatusStore()
const status = ref(route.query.status)
const orderId = ref(route.query.order_id)
const refNum = ref(route.query.ref_num)
const transactionId = ref(route.query.transaction_id)
const cardNumber = ref(route.query.card_number)
const trackingCode = ref(route.query.tracking_code)

const decrementCountdown = () => {
  if (time.value > 0){
    time.value -= 1;
  }
};

const verifyTransaction = () => {
  axios.post('/result' , {
    order_id: orderId.value,
    ref_number: refNum.value,
    cardNumber: cardNumber.value,
    trackingCode: trackingCode.value,
    transaction_id: transactionId.value,
    card_number: cardNumber.value ?? null,
    tracking_code: trackingCode.value ?? null,
  })
}

onMounted(() => {
  const interval = setInterval(() => {
    decrementCountdown();
    if (time.value <= 0) {
      clearInterval(interval);
      verifyTransaction();
      paymentStore.setLastTransaction(refNum.value)
      router.push('/result');
    }
  }, 1000)
})
</script>

<style scoped>

</style>