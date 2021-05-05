import Vue from 'vue'
import Vuex from 'vuex'
import router from '../routes/index'
import axios from '../api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    dataEdit: []
  },
  mutations: {
    getProduct (state, payload) {
      state.products = payload
    },
    getEdit (state, payload) {
      state.dataEdit = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then((data) => {
          localStorage.token = data.data.accessToken
          router.push({ name: 'Home' })
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    getProduct (context) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          token: localStorage.token
        }
      })
        .then((data) => {
          context.commit('getProduct', data.data)
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    postProduct (context, payload) {
      axios({
        method: 'POST',
        url: '/products',
        headers: {
          token: localStorage.token
        },
        data: {
          name: payload.name,
          img_url: payload.img_url,
          price: payload.price,
          stock: payload.stock
        }
      })
        .then((data) => {
          router.push({ name: 'Home' })
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    deleteProduct (context, payload) {
      axios({
        method: 'DELETE',
        url: '/products/' + payload.id,
        headers: {
          token: localStorage.token
        }
      })
        .then(() => {
          console.log('Data has been deleted')
          // router.push({ name: 'Login' })
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    getEdit (context, payload) {
      axios({
        method: 'GET',
        url: '/products/' + payload.id,
        headers: {
          token: localStorage.token
        }
      })
        .then((data) => {
          context.commit('getEdit', data.data)
          router.push({ name: 'EditProduct' })
          // console.log('Data has been deleted')
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    putProduct (context, payload) {
      axios({
        method: 'PUT',
        url: '/products/' + payload.id,
        headers: {
          token: localStorage.token
        },
        data: {
          name: payload.name,
          img_url: payload.img_url,
          price: payload.price,
          stock: payload.stock
        }
      })
        .then((data) => {
          router.push({ name: 'Home' })
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    }
  },
  modules: {
  }
})
