<template>
  <div>
    <NavBar />
    <!-- Add Product Button -->
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col-6 col-md-4 col-lg-2">
          <a
            href="#"
            class="btn btn-warning text-white"
            @click.prevent="addPages"
            >Add Product</a
          >
        </div>
      </div>
      <!-- End of Add Product Button -->
      <!-- Main Card -->
      <div class="row my-1">
        <Card v-for="product in products" :key="product.id" :product="product" />
      </div>
      <!-- End of Main Card -->
    </div>
  </div>
</template>
<script>
import NavBar from '../components/NavBar'
import Card from '../components/Card'

export default {
  components: {
    NavBar,
    Card
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    addPages () {
      return this.$router.push({ name: 'AddProduct' })
    }
  },
  created () {
    this.$store.dispatch('getProduct')
  }
}
</script>
