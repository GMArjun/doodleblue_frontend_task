<template>
  <div id="app">
    <div class="container mx-auto px-3">
      <div class="flex py-12">
        <div class="self-center text-4xl font-bold mr-auto leading-none">Products</div>
        <button
          class="px-12 py-4 rounded mainGradient text-white text-2xl leading-none focus:outline-none"
        >Add Product</button>
      </div>

      <P-Controller title="Add Product" @productDataBack="handleIncomingProduct" />

      <div class="flex flex-wrap">
        <div class="w-3/12 px-3"></div>
        <div class="w-9/12">
          <div class="flex flex-wrap products">
            <div v-for="(product,i) in products" :key="i" class="holder w-4/12">
              <div class="product m-4 rounded-b-md cursor-pointer">
                <div class="relative overflow-hidden productImage rounded-t-md h-56">
                  <img
                    :src="product.image"
                    class="w-full h-full object-cover transition ease-in duration-300"
                    alt
                  />
                </div>
                <div class="px-4 py-6 text-center">
                  <div class="font-bold text-xl leading-none mb-2">{{product.title}}</div>
                  <div class="text-sm">${{product.price}}</div>
                </div>

                <P-Controller
                  title="Edit Product"
                  :exist="product"
                  :existIndex="i"
                  @productDataBack="editIncomingProduct"
                  v-if="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductController from "./components/productController";
export default {
  name: "App",
  data() {
    return {
      products: [
        {
          category: "category_1",
          title: "TShirt",
          price: 200,
          isTopProduct: true,
          image:
            "https://images.unsplash.com/photo-1546015720-b8b30df5aa27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        },
      ],
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
      this.$set(this.products, params.index, params.prodData);
    },
  },
};
</script>

<style>
</style>
