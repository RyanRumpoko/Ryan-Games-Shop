import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axios from '../api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    dataProduct: [],
    carts: [],
    histories: []
  },
  mutations: {
    getProduct (state, payload) {
      state.products = payload
    },
    getProductId (state, payload) {
      state.dataProduct = payload
    },
    getCustomerProduct (state, payload) {
      state.carts = payload
    },
    getHistoryProduct (state, payload) {
      state.histories = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then((data) => {
          router.push({ name: 'Login' })
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
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
    getProductId (context, payload) {
      axios({
        method: 'GET',
        url: '/customers/' + payload.id,
        headers: {
          token: localStorage.token
        }
      })
        .then((data) => {
          context.commit('getProductId', data.data)
          router.push({ name: 'AddCart' })
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    addCart (context, payload) {
      axios({
        method: 'POST',
        url: '/customers/' + payload.id,
        data: {
          quantity: payload.quantity
        },
        headers: {
          token: localStorage.token
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
    getCustomerProduct (context) {
      axios({
        method: 'GET',
        url: '/customers',
        headers: {
          token: localStorage.token
        }
      })
        .then((data) => {
          context.commit('getCustomerProduct', data.data)
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    deleteCart (context, payload) {
      axios({
        method: 'DELETE',
        url: '/customers/' + payload.id,
        headers: {
          token: localStorage.token
        }
      })
        .then(() => {
          console.log('Data has been deleted')
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data)
          }
        })
    },
    checkout (context, payload) {
      for (let i = 0; i < payload.length; i++) {
        axios({
          method: 'PATCH',
          url: '/customers/' + payload[i].id,
          headers: {
            token: localStorage.token
          }
        })
          .then((data) => {
            console.log(data.data)
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data)
            }
          })
      }
    },
    getHistoryProduct (context) {
      axios({
        method: 'GET',
        url: '/customers/history',
        headers: {
          token: localStorage.token
        }
      })
        .then((data) => {
          context.commit('getHistoryProduct', data.data)
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
