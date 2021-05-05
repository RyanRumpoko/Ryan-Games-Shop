<template>
  <div class="card border border-dark" v-if="cart.status === false">
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-5 d-flex align-items-end bg-white">
          <img class="img-fluid" :src="cart.Product.img_url">
        </div>
        <div class="col-12 col-md-8 col-lg-6">
          <h3 class="card-title">{{cart.Product.name}}</h3>
          <p class="card-text">Quantity: {{cart.quantity}}</p>
          <p class="card-text">{{convert(cart.Product.price)}} @each</p>
          <a
          href="#"
          class="col-12 col-md-6 col-lg-6 btn btn-warning text-white mb-1"
          @click.prevent="deleteCart"
          >Delete</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cart'],
  methods: {
    deleteCart () {
      const inputData = {
        id: this.cart.id
      }
      this.$store.dispatch('deleteCart', inputData)
        .then(() => {
          this.$store.dispatch('getCustomerProduct')
        })
    },
    convert (value) {
      return (value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    }
  }
}
</script>

<style>

</style>
