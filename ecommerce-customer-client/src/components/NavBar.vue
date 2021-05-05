<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand text-white">TOKO RYAN</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'Home' }">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Cart' }">Cart</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'History' }">History</router-link>
        </li>
      </ul>
      <button type="button" class="btn btn-danger" @click.prevent="logout()">
        Log Out
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>
