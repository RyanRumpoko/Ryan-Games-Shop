<template>
  <div class="container-fluid">
    <div class="row my-5 justify-content-center">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="h3">Login</div>
        <form @submit.prevent="loginHandle">
          <div class="mb-3">
            <label for="email_login" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email_login"
              placeholder="ryan@mail.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password_login" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password_login"
              placeholder="password123"
              required
            />
          </div>
          <div>
          <button type="submit" class="btn btn-primary mr-1">Login</button>
          <button type="button" class="btn btn-primary" @click.prevent="registerPage">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email_login: '',
      password_login: ''
    }
  },
  methods: {
    loginHandle () {
      const inputData = {
        email: this.email_login,
        password: this.password_login
      }
      this.email_login = ''
      this.password_login = ''
      this.$store.dispatch('login', inputData)
    },
    registerPage () {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>
