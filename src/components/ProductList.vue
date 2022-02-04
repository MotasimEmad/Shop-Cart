<template>
  <div>
    <h1>Items</h1>
    <h1 v-if="loading">Loading ...</h1>
    <ul v-else>
        <li v-for="product in products" :key="product.id">
            {{ product.title }} -- {{ product.inventory }}
            <button 
            :disabled="!productInStock(product)"
            @click="addProductToCart(product)">Add To Cart</button>
        </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'Shopping',

  data() {
      return {
          loading: false
      }
  },

  methods: {

      addProductToCart(product) {
          this.$store.dispatch('addProductToCart', product)
      }
  },

  computed: {

      products() {
          return this.$store.state.products
      },

      productInStock() {
          return this.$store.getters.productInStock
      }
  },

  created() {
      this.loading = true
      this.$store.dispatch('fetchProducts')
      .then(() => this.loading = false)
  }
 
}
</script>
