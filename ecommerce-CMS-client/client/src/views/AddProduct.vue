<template>
  <div>
    <NavBar />

    <div class="container-fluid">
      <div class="row my-5 justify-content-center">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="h3">Add Product</div>
          <form @submit.prevent="addHandle">
            <div class="mb-3">
              <label for="name_product" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="name_product"
                placeholder="Product Name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="img_product" class="form-label">Image URL</label>
              <input
                type="text"
                class="form-control"
                v-model="img_product"
                placeholder="Image URL"
                required
              />
            </div>
            <div class="mb-3">
              <label for="price_product" class="form-label">Price</label>
              <input
                type="number"
                class="form-control"
                v-model="price_product"
                placeholder="1000000"
                required
              />
            </div>
            <div class="mb-3">
              <label for="stock_product" class="form-label">Stock</label>
              <input
                type="number"
                class="form-control"
                v-model="stock_product"
                placeholder="10"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary mr-1">Add Product</button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="homePage"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
  data () {
    return {
      name_product: '',
      img_product: '',
      price_product: '',
      stock_product: ''
    }
  },
  components: {
    NavBar
  },
  methods: {
    addHandle () {
      const inputData = {
        name: this.name_product,
        img_url: this.img_product,
        price: this.price_product,
        stock: this.stock_product
      }
      this.name_product = ''
      this.img_product = ''
      this.price_product = ''
      this.stock_product = ''
      this.$store.dispatch('postProduct', inputData)
    },
    homePage () {
      return this.$router.push({ name: 'Home' })
    }
  }
}
</script>
