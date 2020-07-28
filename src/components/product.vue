<template>
  <div class="holder w-4/12" :key="pIndex">
    <div class="product m-4 rounded-md cursor-pointer" @click="modalVisible = true">
      <div class="relative overflow-hidden productImage rounded-t-md h-56">
        <img :src="pData.image" class="w-full h-full object-cover transition ease-in duration-300" />
      </div>
      <div class="px-4 py-6 text-center">
        <div class="font-bold text-xl leading-none mb-2">{{pData.title}}</div>
        <div class="text-sm flex justify-center">
          <span v-if="pData.originalPrice" class="mr-2 originalPrice">${{pData.originalPrice}}</span>
          <span>${{pData.price}}</span>
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
