<template>
  <div id="app">
    <div class="container mx-auto px-3">
      <div class="flex py-12">
        <div class="self-center text-4xl font-bold mr-auto leading-none">Products</div>
        <button
          @click="modalVisible = true"
          class="px-12 py-4 rounded mainGradient text-white text-2xl leading-none focus:outline-none"
        >Add Product</button>
      </div>

      <P-Controller
        title="Add Product"
        @productDataBack="handleIncomingProduct"
        @closeModal="modalVisible = $event"
        v-if="modalVisible"
      />

      <div class="flex flex-wrap">
        <div class="w-3/12 pr-6">
          <Categories-Tray :cateData="Categories" @selectedCategory="handleSelectedCategory" />
        </div>

        <div class="w-9/12">
          <div class="flex flex-wrap products">
            <Product
              v-for="(product,i) in productsClone"
              :key="i"
              :pData="product"
              :pIndex="i"
              @editedData="handleEditedData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductController from "./components/productController";
import CategoriesTray from "./components/categories";
import Product from "./components/product";

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
  components: {
    "P-Controller": ProductController,
    "Categories-Tray": CategoriesTray,
    Product,
  },
  data() {
    return {
      products: [],
      productsClone: [],
      Categories,
      modalVisible: false,
    };
  },
  mounted() {
    if (
      localStorage &&
      localStorage["products"] &&
      localStorage["products"].length
    ) {
      this.products = JSON.parse(localStorage["products"]);
    }
  },
  watch: {
    products: function (newVal) {
      this.productsClone = JSON.parse(JSON.stringify(newVal));
    },
  },
  methods: {
    handleIncomingProduct(params) {
      this.products.push(params);
      this.setLocalCopy();
    },
    handleEditedData(params) {
      this.$set(this.products, params.index, params.prodData);
      this.setLocalCopy();
    },
    handleSelectedCategory(selected) {
      let categoryFiltered = this.products.filter(
        (product) => product.category == selected
      );
      if (selected === "Cate_0") {
        this.productsClone = JSON.parse(JSON.stringify(this.products));
      } else {
        this.productsClone = categoryFiltered;
      }
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
