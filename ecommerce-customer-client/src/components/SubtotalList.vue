<template>
  <div class="p">
    "{{cart.Product.name}}" x {{cart.quantity}} = {{convert(subtotalHandler())}}
  </div>
</template>

<script>
export default {
  props: ['cart'],
  methods: {
    convert (value) {
      return (value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    subtotalHandler () {
      return this.cart.Product.price * this.cart.quantity
    }
  }
}
</script>

<style>

</style>
