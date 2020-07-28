<template>
  <div id="app">
    <div v-for="(product,i) in products" :key="i">{{product.title}}{{i}}</div>
    <Add-Product @addedProduct="handleIncomingProduct" />
  </div>
</template>

<script>
import AddProduct from "./components/addProduct";
export default {
  name: "App",
  data() {
    return {
      products: [],
    };
  },
  components: {
    "Add-Product": AddProduct,
  },
  methods: {
    handleIncomingProduct(params) {
      this.products.push(params);
      console.log(params);
    },
  },
};
</script>

<style>
</style>
