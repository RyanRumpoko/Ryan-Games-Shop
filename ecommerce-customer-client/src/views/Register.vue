<template>
  <div class="container-fluid">
    <div class="row my-5 justify-content-center">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="h3">Register</div>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="name_register" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              v-model="name_register"
              placeholder="Ryan Rumpoko"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email_register" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email_register"
              placeholder="ryan@mail.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password_register" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password_register"
              placeholder="password123"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary mr-1">Register</button>
          <button type="button" class="btn btn-primary" @click.prevent="loginPage">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name_register: '',
      email_register: '',
      password_register: ''
    }
  },
  methods: {
    register () {
      const inputData = {
        name: this.name_register,
        email: this.email_register,
        password: this.password_register
      }
      this.name_register = ''
      this.email_register = ''
      this.password_register = ''
      this.$store.dispatch('register', inputData)
    },
    loginPage () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
