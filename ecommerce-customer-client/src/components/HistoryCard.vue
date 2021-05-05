<template>
  <tr>
    <td class="my-1">{{history.Product.name}}</td>
    <td class="my-1">{{history.quantity}}</td>
    <td class="my-1">{{convert(subtotalHandler())}}</td>
    <div class="text-center">
      <a
      href="#"
      class="col-12 col-md-8 col-lg-8 btn btn-warning text-white my-1"
      @click.prevent="deleteCart"
      >Delete</a
      >
    </div>
  </tr>
</template>

<script>
export default {
  props: ['history'],
  methods: {
    subtotalHandler () {
      return this.history.Product.price * this.history.quantity
    },
    convert (value) {
      return (value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    deleteCart () {
      const inputData = {
        id: this.history.id
      }
      this.$store.dispatch('deleteCart', inputData)
        .then(() => {
          this.$store.dispatch('getHistoryProduct')
        })
    }
  }
}
</script>

<style>

</style>
