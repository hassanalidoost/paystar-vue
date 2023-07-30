<script setup>
import ModalLoader from "@/components/loader/ModalLoader.vue"
import { PlusIcon , MinusIcon , TrashIcon } from "vue-tabler-icons"
import {computed, ref, watchEffect} from "vue";
import axios from "@/plugins/axios";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import {paymentStatusStore} from "@/stores/paymentStatusStore";

const paymentStore = paymentStatusStore()
const toast = useToast()
const router = useRouter()
const orderItems = ref([])
const cards = ref([])
const selectedCard = ref(null)
const orderId = ref(null)
const isLoading = ref(false)

watchEffect(() => {
  axios.get('/orders/checkout')
    .then((r) => {
      if (r.data.order !== null){
        orderItems.value = r.data.order.order_items
        orderId.value = r.data.order.order_items[0].order_id ?? null
      }
    })
    .catch((e) => {
      console.log(e)
    })

  axios.get('/cards')
    .then((r) => {
      cards.value = r.data.cards
    })
    .catch((e) => {
      console.log(e)
    })
})

const increaseQuantity = (item) => {
  axios.put('/orders/item/' + item.id + '/increase')
    .then(() => {
      const targetItem = orderItems.value.find(target => target.id === item.id)
      targetItem.quantity++
      toast.success('Quantity updated successfully!')
    })
    .catch((e) => {
      console.log(e)
      toast.error('Something went wrong!')
    })
}

const decreaseQuantity = (item) => {
  axios.put('/orders/item/' + item.id + '/decrease')
      .then(() => {
        const targetItem = orderItems.value.find(target => target.id === item.id)
        const targetIndex = orderItems.value.findIndex(target => target.id === item.id)
        if (targetItem.quantity === 1){
          orderItems.value.splice(targetIndex , 1)
        }else {
          targetItem.quantity--
        }
        toast.success('Quantity updated successfully!')
      })
      .catch((e) => {
        console.log(e)
        toast.error('Something went wrong!')
      })
}

const removeItem = (item) => {
  axios.delete('/orders/item/' + item.id)
      .then(() => {
        const targetIndex = orderItems.value.findIndex(target => target.id === item.id)
        orderItems.value.splice(targetIndex , 1)
        toast.success('Item deleted successfully!')
      })
      .catch((e) => {
        console.log(e)
        toast.error('Something went wrong!')
      })
}

const totalAmount = computed(() => {
  let totalPrice = 0
  orderItems.value.forEach(item => {
    totalPrice += item.quantity * item.product.price;
  });
  return totalPrice
})

const pay = async () => {
  isLoading.value = true
  await axios.post('/payment' , {
    orderId: orderId.value,
    totalAmount: totalAmount.value.toFixed(0),
  })
  .then((r) => {
    window.location.href = "https://core.paystar.ir/api/pardakht/payment?token=" + r.data.data.token;
    isLoading.value = false
    paymentStore.updatePaymentStatus()
  })
}

const calculateTotal = (quantity, price) => {
  return quantity * price
}

</script>

<template>
  <ModalLoader :loading="isLoading" />
  <v-container>
    <v-card>
      <v-card-title>
        <h2>Checkout Page</h2>
      </v-card-title>
      <v-card-text>
        <v-list>
          <div v-if="orderItems.length === 0" class="">
            <p>There is nothing here...</p>
          </div>
          <v-list-item v-else v-for="(item, index) in orderItems" :key="index">
            <div class="flex items-center gap-8">
              <v-list-item-content>
                <v-list-item-title>{{ item.product.name }}</v-list-item-title>
                <v-list-item-subtitle>Price: {{ item.product.price }}</v-list-item-subtitle>
                <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
                <v-list-item-subtitle>Total: {{ calculateTotal(item.quantity ,item.product.price) }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <div class="flex items-center gap-2">
                  <v-btn @click="increaseQuantity(item)" icon>
                    <PlusIcon />
                  </v-btn>
                  <v-btn @click="decreaseQuantity(item)" icon>
                    <MinusIcon />
                  </v-btn>
                  <v-btn @click="removeItem(item)" icon>
                    <TrashIcon />
                  </v-btn>
                </div>
              </v-list-item-action>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-select
            v-model="selectedCard"
            :items="cards"
            item-title="card_number"
            item-value="id"
            label="Select Card"
            :disabled="orderItems.length === 0"
            outlined
        ></v-select>
        <v-spacer></v-spacer>
        <p>Total Amount: {{ totalAmount.toFixed(2) }}</p>
        <v-btn color="primary" @click="pay" :disabled="orderItems === null || selectedCard === null">Pay</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>