<template>
  <div id="app">
    <resize-observer @notify="handleResize" />
    <VueSidebarUi v-if="mobileView" v-model="hasRightSidebarOpen" :width="280" absolute left>
      <i slot="button-icon" class="material-icons">
        <img src="./assets/images/Hamburger.png" class="h-6 w-6" v-if="!hasRightSidebarOpen" alt />
        <div v-else class="closeI"></div>
      </i>
      <div class="sidebar p-4">
        <Categories-Tray :cateData="Categories" @selectedCategory="currentC = $event" />
      </div>
    </VueSidebarUi>
    <div class="max-w-screen-xl mx-auto px-3 py-3 sm:px-6 xl:px-0">
      <div class="flex py-8 sm:py-12">
        <div class="self-center text-2xl flex sm:text-4xl font-medium mr-auto leading-none text-black" >Products</div>
        <button @click="modalVisible = true" class="px-4 sm:px-12 py-3 sm:py-4 rounded mainGradient text-white font-light text-base sm:text-2xl leading-none focus:outline-none" >Add Product</button>
      </div>
      <div class="flex flex-col lg:flex-row flex-wrap">
        <div class="w-full lg:w-3/12 pr-0 lg:pr-5 order-2 lg:order-1">
          <Categories-Tray v-if="!mobileView" :cateData="Categories" @selectedCategory="currentC = $event" class="my-6" />
          <PriceFilter @filterRange="currentF = $event" :productsData="products" v-if="!mobileView && products && products.length" class="my-10" />
          <TopProducts class="my-10" :productsData="paginated('products')" v-if="paginated('products') && paginated('products').length"/>
        </div>
        <div class="w-full lg:w-9/12 order-1 lg:order-2" v-if="products && products.length && filteredProducts && filteredProducts.length">
          <div class="flex px-2 lg:px-4 py-3">
            <div class="mr-3 self-center text-sm sm:text-base text-gray" v-if="$refs.paginator">Showing {{$refs.paginator.pageItemsCount}} Results</div>
            <SortBy class="ml-auto" v-if="!mobileView" :productsData="products" @selectedSort="sortBy = $event" />
            <Dropdown class="ml-auto" v-else>
              <div class="uppercase mb-2 text-sm font-medium text-gray">Sort By</div>
              <SortBy class="ml-auto" v-if="mobileView" :productsData="products" @selectedSort="sortBy = $event" />
              <PriceFilter @filterRange="currentF = $event" :productsData="products" v-if="mobileView && products && products.length" class="mt-3" />
            </Dropdown>
          </div>
          <paginate v-if="filteredProducts && filteredProducts.length" name="products" ref="paginator" tag="div" class="flex flex-wrap products pWrapper" :list="filteredProducts" :per="9">
            <Product v-for="(product,i) in paginated('products')" :key="i" :pData="product" :pIndex="i" @editedData="handleEditedData" />
          </paginate>
          <paginate-links for="products" class="mt-8 mb-0 md:my-10" :show-step-links="true" :hide-single-page="true" :limit="3"></paginate-links>
        </div>
        <div class="w-full lg:w-9/12 order-1 lg:order-2" v-else>
          <div class="flex flex-col justify-center items-center p-10 py-20">
            <img src="./assets/images/empty.png" class="max-w-full flex-shrink-0" alt />
            <div class="text-lg sm:text-4xl text-center text-gray mt-2 pl-3">No Products Found</div>
          </div>
        </div>
      </div>
    </div>
    <P-Controller title="Add Product" @productDataBack="handleIncomingProduct" @closeModal="modalVisible = $event" v-if="modalVisible"/>
  </div>
</template>

<script>
import ProductController from "./components/productController";
import CategoriesTray from "./components/categories";
import Product from "./components/product";
import TopProducts from "./components/topProducts";
import PriceFilter from "./components/priceFilter";
import SortBy from "./components/sortBy";
import Dropdown from "./components/dropDown";
import mockProducts from "./mockData/products.json";

const Categories = [
  {
    Name: "All Categories",
    Value: "Cate_0",
  },
  {
    Name: "Fashion",
    Value: "Cate_1",
  },
  {
    Name: "Book & Audible",
    Value: "Cate_2",
  },
  {
    Name: "Electronics",
    Value: "Cate_3",
  },
  {
    Name: "Home, Kitchen",
    Value: "Cate_4",
  },
];

export default {
  name: "App",
  components: {
    "P-Controller": ProductController,
    "Categories-Tray": CategoriesTray,
    Product,
    TopProducts,
    PriceFilter,
    SortBy,
    Dropdown,
  },
  data() {
    return {
      products: [],
      paginate: ["products"],
      currentC: null,
      sortBy: null,
      Categories,
      modalVisible: false,
      currentF: null,
      hasRightSidebarOpen: false,
      mobileView: false,
    };
  },
  watch: {
    sortBy: function (newVal) {
      switch (newVal) {
        case "lh":
          this.products.sort((a, b) => a.price - b.price);
          break;
        case "hl":
          this.products.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.products = mockProducts && mockProducts.length ? mockProducts : [];
  },
  methods: {
    handleIncomingProduct(params) {
      this.products.unshift(params);
    },
    handleEditedData(params) {
      this.$set(this.paginated("products"), params.index, params.prodData);
    },
    handleResize({ width }) {
      this.mobileView = width <= 1023 ? true : false;
    },
  },
  computed: {
    filteredProducts() {
      let rcF, cF;
      cF = this.currentC === "Cate_0" ? JSON.parse(JSON.stringify(this.products)) : this.products.filter((p) => p.category == this.currentC);
      rcF = this.currentF ? cF.filter((p) => p.price >= this.currentF[0] && p.price <= this.currentF[1]) : cF;
      return rcF;
    },
  },
};
</script>

<style>
</style>
