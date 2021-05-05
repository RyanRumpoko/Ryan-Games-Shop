<template>
  <div>
    <NavBar />

    <div class="container-fluid">
      <div class="row my-5 justify-content-center">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="h3">Edit Product</div>
          <form @submit.prevent="editHandle">
            <div class="mb-3">
              <label for="name_product" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="dataEdit.name"
                placeholder="Product Name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="img_product" class="form-label">Image URL</label>
              <input
                type="text"
                class="form-control"
                v-model="dataEdit.img_url"
                placeholder="Image URL"
                required
              />
            </div>
            <div class="mb-3">
              <label for="price_product" class="form-label">Price</label>
              <input
                type="number"
                class="form-control"
                v-model="dataEdit.price"
                placeholder="1000000"
                required
              />
            </div>
            <div class="mb-3">
              <label for="stock_product" class="form-label">Stock</label>
              <input
                type="number"
                class="form-control"
                v-model="dataEdit.stock"
                placeholder="10"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary mr-1">Edit Product</button>
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
  components: {
    NavBar
  },
  computed: {
    dataEdit () {
      return this.$store.state.dataEdit
    }
  },
  methods: {
    homePage () {
      return this.$router.push({ name: 'Home' })
    },
    editHandle () {
      const inputData = {
        id: this.dataEdit.id,
        name: this.dataEdit.name,
        img_url: this.dataEdit.img_url,
        price: this.dataEdit.price,
        stock: this.dataEdit.stock
      }
      this.dataEdit.id = ''
      this.dataEdit.name = ''
      this.dataEdit.img_url = ''
      this.dataEdit.price = ''
      this.dataEdit.stock = ''
      this.$store.dispatch('putProduct', inputData)
    }
  }
}
</script>
