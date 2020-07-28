<template>
  <div class="border m-3">
    <div class="p-3 text-sm">
      <div>
        <label class="block">Product Category</label>
        <select class="border m-2" v-model="selectedCategory">
          <option value disabled>Select</option>
          <option value="category_1">Cat 1</option>
          <option value="category_2">Cat 2</option>
          <option value="category_3">Cat 3</option>
        </select>
      </div>
      <div>
        <label class="block">Product Title</label>
        <input type="text" class="border m-2" v-model="productTitle" />
      </div>
      <div>
        <label class="block">Price</label>
        <input type="text" class="border m-2" v-model="productPrice" />
      </div>
      <div>
        <label class="block">Top Products</label>
        <input type="checkbox" class="border m-2" v-model="isTopProduct" />
      </div>
      <div>
        <label class="block">Upload File</label>
        <input type="file" @change="selectedImage" accept="image/*" />

        <div class="image-preview" v-if="imageData.length > 0">
          <img class="preview h-10 w-10" :src="imageData" />
        </div>
      </div>
    </div>
    <div class="flex p-3">
      <button @click="closeModal" class="border p-2 mr-2 text-sm">Cancel</button>
      <button @click="saveProduct" class="border p-2 text-sm">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductController",
  data() {
    return {
      selectedCategory: "",
      productTitle: "",
      productPrice: "",
      isTopProduct: false,
      imageData: "",
    };
  },
  props: ["exist", "existIndex"],
  mounted() {
    if (this.exist) {
      this.selectedCategory = this.exist.category;
      this.productTitle = this.exist.title;
      this.productPrice = this.exist.price;
      this.isTopProduct = this.exist.isTopProduct;
      this.imageData = this.exist.image;
    }
  },
  methods: {
    selectedImage: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => (this.imageData = e.target.result);
        reader.readAsDataURL(input.files[0]);
      } else {
        this.imageData = "";
      }
    },
    saveProduct() {
      if (
        this.selectedCategory &&
        this.productTitle &&
        this.productPrice &&
        this.isTopProduct != undefined &&
        this.imageData
      ) {
        const ProductData = {
          category: this.selectedCategory,
          title: this.productTitle,
          price: this.productPrice,
          isTopProduct: this.isTopProduct,
          image: this.imageData,
        };
        if (this.existIndex != undefined) {
          this.$emit("productDataBack", {
            prodData: ProductData,
            index: this.existIndex,
          });
        } else {
          this.$emit("productDataBack", ProductData);
        }
      } else {
        console.log("Fill ALl Fields");
      }
    },
    closeModal() {
      this.$emit("close", false);
    },
  },
};
</script>

<style>
</style>
