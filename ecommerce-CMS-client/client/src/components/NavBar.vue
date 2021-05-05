<template>
  <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">TOKO RYAN</a>
        <button type="button" class="btn btn-danger" @click="logout()">
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
