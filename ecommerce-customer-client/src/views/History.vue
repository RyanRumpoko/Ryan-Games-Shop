<template>
  <div>
    <NavBar />

    <div class="container-fluid">
      <div class="row my-3 justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <table class="table table-borderless">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col" class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <HistoryCard v-for="history in histories" :key="history.id" :history="history"/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import HistoryCard from '../components/HistoryCard'
export default {
  components: {
    NavBar,
    HistoryCard
  },
  computed: {
    histories () {
      return this.$store.state.histories
    }
  },
  created () {
    this.$store.dispatch('getHistoryProduct')
  }
}
</script>

<style>

</style>
