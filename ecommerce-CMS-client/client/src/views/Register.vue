<template>
  <div class="container-fluid">
    <div class="row my-5 justify-content-center">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="h3">Register</div>
        <form>
          <div class="mb-3">
            <label for="name_register" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name_register"
              placeholder="Ryan Rumpoko"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email_register" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email_register"
              placeholder="ryan@mail.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password_register" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password_register"
              placeholder="password123"
              required
            />
          </div>
          <div class="mb-3">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Role</label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary mr-1" @click="loginPage">Register</button>
          <button type="button" class="btn btn-primary" @click="loginPage">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    loginPage () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
