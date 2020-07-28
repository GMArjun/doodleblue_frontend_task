<template>
  <div id="app">
    <div class="container mx-auto px-3">
      <div class="flex py-12">
        <div class="self-center text-4xl font-bold mr-auto leading-none">Products</div>
        <button
          @click="$refs.addProd.isModalOpen = true"
          class="px-12 py-4 rounded mainGradient text-white text-2xl leading-none focus:outline-none"
        >Add Product</button>
      </div>

      <P-Controller title="Add Product" @productDataBack="handleIncomingProduct" ref="addProd" />

      <div class="flex flex-wrap">
        <div class="w-3/12">
          <Categories-Tray :cateData="Categories" />
        </div>

        <div class="w-9/12">
          <div class="flex flex-wrap products">
            <div v-for="(product,i) in products" :key="i" class="holder w-4/12">
              <div
                class="product m-4 rounded-b-md cursor-pointer"
                @click="$refs['editProd' + i][0].isModalOpen = true"
              >
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
              </div>

              <P-Controller
                :ref="'editProd'+i"
                title="Edit Product"
                :exist="product"
                :existIndex="i"
                @productDataBack="editIncomingProduct"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductController from "./components/productController";
import CategoriesTray from "./components/categories";

const Categories = [
  {
    Name: "All Categories",
    Value: "Cate_0",
  },
  {
    Name: "Books",
    Value: "Cate_1",
  },
  {
    Name: "Dress",
    Value: "Cate_2",
  },
  {
    Name: "Bags",
    Value: "Cate_3",
  },
  {
    Name: "Mobiles",
    Value: "Cate_4",
  },
];

export default {
  name: "App",
  data() {
    return {
      products: [],
      Categories,
    };
  },
  components: {
    "P-Controller": ProductController,
    "Categories-Tray": CategoriesTray,
  },
  mounted() {
    if (localStorage && localStorage["products"].length) {
      this.products = JSON.parse(localStorage["products"]);
    }
  },
  methods: {
    handleIncomingProduct(params) {
      this.products.push(params);
      this.setLocalCopy();
    },
    editIncomingProduct(params) {
      this.$set(this.products, params.index, params.prodData);
      this.setLocalCopy();
    },
    setLocalCopy() {
      if (localStorage) {
        localStorage.setItem("products", JSON.stringify(this.products));
      }
    },
  },
};
</script>

<style>
</style>
