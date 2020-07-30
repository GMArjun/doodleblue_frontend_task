<template>
  <div id="app">
    <VueSidebarUi v-model="hasRightSidebarOpen" :width="280" absolute left>
      <i slot="button-icon" class="material-icons">
        <img src="./assets/images/Hamburger.png" class="h-6 w-6" alt />
      </i>
      hello
    </VueSidebarUi>

    <div class="max-w-screen-xl mx-auto px-3 py-3 sm:px-6 xl:px-0">
      <div class="flex py-8 sm:py-12">
        <div
          class="self-center text-2xl flex sm:text-4xl font-medium mr-auto leading-none text-black"
        >Products</div>
        <button
          @click="modalVisible = true"
          class="px-4 sm:px-12 py-3 sm:py-4 rounded mainGradient text-white font-light text-base sm:text-2xl leading-none focus:outline-none"
        >Add Product</button>
      </div>

      <div class="flex flex-col lg:flex-row flex-wrap">
        <div class="w-full lg:w-3/12 pr-0 lg:pr-5 order-2 lg:order-1">
          <Categories-Tray
            :cateData="Categories"
            @selectedCategory="currentCategory = $event"
            class="my-6"
          />
          <PriceFilter
            @filterRange="filtered = $event"
            :productsData="cProducts"
            v-if="cProducts && cProducts.length"
            class="my-10"
          />
          <TopProducts class="my-10" :productsData="products" v-if="products && products.length" />
        </div>

        <div class="w-full lg:w-9/12 order-1 lg:order-2" v-if="fProduct && fProduct.length">
          <div class="flex px-4 py-3">
            <div
              class="mr-3 self-center text-gray"
              v-if="$refs.paginator"
            >Showing {{$refs.paginator.pageItemsCount}} Results</div>
            <SortBy class="ml-auto" :productsData="fProduct" @selectedSort="sortBy = $event" />
          </div>

          <div v-if="fProduct && fProduct.length">
            <paginate
              name="fProduct"
              ref="paginator"
              tag="div"
              class="flex flex-wrap products"
              :list="fProduct"
              :per="9"
            >
              <Product
                v-for="(product,i) in paginated('fProduct')"
                :key="i"
                :pData="product"
                :pIndex="i"
                @editedData="handleEditedData"
              />
            </paginate>
            <paginate-links
              for="fProduct"
              class="my-10"
              :show-step-links="true"
              :hide-single-page="true"
              :limit="3"
            ></paginate-links>
          </div>
        </div>

        <div class="w-full lg:w-9/12 order-1 lg:order-2" v-else>
          <div class="flex flex-col justify-center items-center p-10 py-20">
            <img src="./assets/images/empty.png" class="max-w-full flex-shrink-0" alt />
            <div class="text-lg sm:text-4xl text-center text-gray mt-2 pl-3">No Products Available</div>
          </div>
        </div>
      </div>
    </div>

    <P-Controller
      title="Add Product"
      @productDataBack="handleIncomingProduct"
      @closeModal="modalVisible = $event"
      v-if="modalVisible"
    />
  </div>
</template>

<script>
import ProductController from "./components/productController";
import CategoriesTray from "./components/categories";
import Product from "./components/product";
import TopProducts from "./components/topProducts";
import PriceFilter from "./components/priceFilter";
import SortBy from "./components/sortBy";

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
    TopProducts,
    PriceFilter,
    SortBy,
  },
  data() {
    return {
      products: [],
      currentCategory: "Cate_0",
      sortBy: null,
      Categories,
      modalVisible: false,
      paginate: ["fProduct"],
      filtered: null,
      hasRightSidebarOpen: false,
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
    if (
      localStorage &&
      localStorage["products"] &&
      localStorage["products"].length
    ) {
      this.products = JSON.parse(localStorage["products"]);
    }
  },
  methods: {
    handleIncomingProduct(params) {
      this.products.unshift(params);
      this.setLocal();
    },
    handleEditedData(params) {
      this.$set(this.products, params.index, params.prodData);
      this.setLocal();
    },
    setLocal() {
      localStorage
        ? localStorage.setItem("products", JSON.stringify(this.products))
        : "";
    },
  },
  computed: {
    cProducts() {
      return this.currentCategory === "Cate_0"
        ? JSON.parse(JSON.stringify(this.products))
        : this.products.filter(
            (product) => product.category == this.currentCategory
          );
    },
    fProduct() {
      let filtereddata = this.filtered;
      return filtereddata
        ? this.cProducts.filter(
            (p) => p.price >= filtereddata[0] && p.price <= filtereddata[1]
          )
        : this.cProducts;
    },
  },
};
</script>

<style>
</style>
