<template>
  <div>
    <h1>Cart</h1>
     <ul>
        <li v-for="product in products" :key="product.id">
            {{ product.title }} - {{ product.price }}
        </li>
    </ul>
    <button @click='$store.dispatch("check")'>Check Out</button>

    <p v-bind="status"></p>
  </div>
</template>

<script>


export default {
  name: 'Cart',

  computed: {

      products() {
        return this.$store.getters.cartProducts
      },

      status() {
          return this.$store.state.checkStatus
      }
    },

}
</script>
