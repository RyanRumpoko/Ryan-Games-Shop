<template>
  <div>
    <NavBar />

    <div class="container-fluid">
      <div class="row my-3 justify-content-center">
        <Card v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Card from '../components/Card'
export default {
  name: 'Home',
  components: {
    NavBar,
    Card
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('getProduct')
  }
}
</script>
