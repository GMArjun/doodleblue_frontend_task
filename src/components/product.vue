<template>
  <div class="holder w-4/12">
    <div
      class="product m-4 rounded-md cursor-pointer"
      @click="$refs['editProd' + pIndex].isModalOpen = true"
    >
      <div class="relative overflow-hidden productImage rounded-t-md h-56">
        <img :src="pData.image" class="w-full h-full object-cover transition ease-in duration-300" />
      </div>
      <div class="px-4 py-6 text-center">
        <div class="font-bold text-xl leading-none mb-2">{{pData.title}}</div>
        <div class="text-sm">${{pData.price}}</div>
      </div>
    </div>
    <P-Controller
      :ref="'editProd'+pIndex"
      title="Edit Product"
      :exist="pData"
      :existIndex="pIndex"
      @productDataBack="editIncomingProduct"
    />
  </div>
</template>

<script>
import ProductController from "./productController";
export default {
  name: "Product",
  data() {
    return {};
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
