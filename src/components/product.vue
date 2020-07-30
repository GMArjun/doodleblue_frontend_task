<template>
  <div class="holder w-6/12 md:w-4/12 lg:w-6/12 xl:w-4/12" :key="pIndex">
    <div class="product m-1 sm:m-2 lg:m-4 rounded-md cursor-pointer" @click="modalVisible = true">
      <div class="relative overflow-hidden productImage rounded-t-md h-32 sm:h-48 lg:h-56">
        <img :src="pData.image" class="w-full h-full object-cover transition ease-in duration-300" />
      </div>
      <div class="px-4 py-4 sm:py-6 lg:py-8 text-center">
        <div class="font-bold text-md md:text-xl leading-none mb-2 truncate">{{pData.title}}</div>
        <div class="text-xs sm:text-sm flex justify-center">
          <span v-if="pData.originalPrice" class="mr-2 line-through text-gray">${{(pData.originalPrice).toFixed(2)}}</span>
          <span>${{(pData.price).toFixed(2)}}</span>
        </div>
      </div>
    </div>
    <P-Controller
      v-if="modalVisible"
      title="Edit Product"
      :exist="pData"
      :existIndex="pIndex"
      @productDataBack="editIncomingProduct"
      @closeModal="modalVisible = $event"
    />
  </div>
</template>

<script>
import ProductController from "./productController";
export default {
  name: "Product",
  data() {
    return {
      modalVisible: false,
    };
  },
  props: ["pData", "pIndex"],
  components: {
    "P-Controller": ProductController,
  },
  methods: {
    editIncomingProduct(params) {
      this.$emit("editedData", params);
    },
  },
};
</script>

<style>
</style>
