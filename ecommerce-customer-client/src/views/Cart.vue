<template>
  <div>
    <NavBar />

    <div class="container-fluid">
      <div class="row my-3 justify-content-center">
        <div class="col-12 col-md-6 col-lg-5">
          <CustomerCard v-for="cart in carts" :key="cart.id" :cart="cart" />
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="h1">Subtotal</div>
          <SubtotalList v-for="cart in carts" :key="cart.id" :cart="cart" />
          <div class="h1 mt-5">Total</div>
          <div class="h5">{{ convert(totalHandler) }}</div>
          <button type="button" class="btn btn-primary col-12 mt-3" @click.prevent="checkout">
          Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import CustomerCard from '../components/CustomerCard'
import SubtotalList from '../components/SubtotalList'
export default {
  components: {
    NavBar,
    CustomerCard,
    SubtotalList
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalHandler () {
      let total = 0
      for (let i = 0; i < this.carts.length; i++) {
        total += this.carts[i].Product.price * this.carts[i].quantity
      }
      return total
    }
  },
  methods: {
    convert (value) {
      return (value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    checkout () {
      const dataId = this.carts
      this.$store.dispatch('checkout', dataId)
        .then(() => {
          this.$store.dispatch('getCustomerProduct')
        })
    }
  },
  created () {
    this.$store.dispatch('getCustomerProduct')
  }
}
</script>

<style>

</style>
