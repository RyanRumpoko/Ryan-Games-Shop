<template>
  <div class="col-10 col-md-3 col-lg-2 my-1">
    <div class="card border border-dark">
      <div class="card-header d-flex align-items-end bg-white" style="height: 200px">
        <img class="card-img-top p-1 img-fluid align-items-end" :src="product.img_url" alt="Card image cap">
      </div>
      <div class="card-body">
        <h3 class="card-title" style="font-size:1.1rem">{{ product.name }}</h3>
        <p class="card-text" style="font-size:80%">Price:<br>{{ convert(product.price) }}</p>
        <p class="card-text" style="font-size:80%">Stock : {{ product.stock }}</p>
        <a
        href="#"
        class="col-12 btn btn-warning text-white mb-1"
        @click.prevent="getProductId"
        >Add To Cart</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    convert (value) {
      return (value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    getProductId () {
      const inputData = {
        id: this.product.id
      }
      this.$store.dispatch('getProductId', inputData)
    }
  }
}
</script>
