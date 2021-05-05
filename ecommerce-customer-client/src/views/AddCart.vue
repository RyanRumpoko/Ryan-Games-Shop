<template>
  <div>
    <NavBar />

    <div class="container-fluid">
      <div class="row my-5 justify-content-center">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="h3">Detail Product</div>
          <img class="img-thumbnail mb-3" :src="dataProduct.img_url">
          <div class="h5">Name: {{ dataProduct.name }}</div>
          <div class="h5">Price: {{ convert(dataProduct.price) }}</div>
          <div class="h5">Stock: {{ dataProduct.stock }}</div>
          <form class="mt-3" @submit.prevent="addCart">
            <div class="mb-3">
              <label for="stock_product" class="form-label">Quantity</label>
              <input
                type="number"
                class="form-control"
                v-model="qty_product"
                placeholder="10"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary mr-1">Add To Cart</button>
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
      qty_product: ''
    }
  },
  components: {
    NavBar
  },
  computed: {
    dataProduct () {
      return this.$store.state.dataProduct
    }
  },
  methods: {
    convert (value) {
      return (value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    homePage () {
      return this.$router.push({ name: 'Home' })
    },
    addCart () {
      const inputData = {
        id: this.dataProduct.id,
        quantity: this.qty_product
      }
      this.qty_product = ''
      this.$store.dispatch('addCart', inputData)
    }
  }
}
</script>
