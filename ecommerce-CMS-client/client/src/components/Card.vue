<template>
  <div class="col-6 col-md-3 col-lg-2 my-1">
    <div class="card border border-dark">
      <img class="card-img-top p-1" :src="product.img_url" alt="Card image cap" style="height: 200px">
      <div class="card-body">
        <h3 class="card-title" style="font-size:1.1rem">{{ product.name }}</h3>
        <p class="card-text" style="font-size:80%">Price:<br>{{ convert(product.price) }}</p>
        <p class="card-text" style="font-size:80%">Stock : {{ product.stock }}</p>
        <a
        href="#"
        class="col-12 btn btn-warning text-white mb-1"
        @click.prevent="getEdit"
        >Edit</a
        >
        <a
        href="#"
        class="col-12 btn btn-warning text-white"
        @click.prevent="deleteProduct"
        >Delete</a
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
    deleteProduct () {
      const inputData = {
        id: this.product.id
      }
      this.$store.dispatch('deleteProduct', inputData)
        .then(() => {
          this.$store.dispatch('getProduct')
        })
    },
    getEdit () {
      const inputData = {
        id: this.product.id
      }
      this.$store.dispatch('getEdit', inputData)
    }
  }
}
</script>
