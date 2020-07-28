<template>
  <div id="app" class="text-sm">
    <button class="border p-2 m-2" @click="addP = true">Add Product</button>
    <P-Controller @productDataBack="handleIncomingProduct" @close="addP = $event" v-if="addP" />

    <div v-for="(product,i) in products" :key="i" class="border m-3 p-3">
      <div>{{i}}</div>
      <div>{{product.title}}</div>
      <div>{{product.category}}</div>
      <div>{{product.price}}</div>
      <div>{{product.isTopProduct}}</div>
      <div v-if="product.image">
        <img :src="product.image" class="h-10 w-10" alt />
      </div>
      <P-Controller :exist="product" :existIndex="i" @productDataBack="editIncomingProduct" />
    </div>
  </div>
</template>

<script>
import ProductController from "./components/productController";
export default {
  name: "App",
  data() {
    return {
      products: [],
      addP: false,
    };
  },
  components: {
    "P-Controller": ProductController,
  },
  methods: {
    handleIncomingProduct(params) {
      this.products.push(params);
    },
    editIncomingProduct(params) {
      this.products[params.index] = params.prodData;
      console.log(this.products[params.index]);
    },
  },
};
</script>

<style>
</style>
