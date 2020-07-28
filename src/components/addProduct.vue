<template>
  <div class="border m-10">
    <div class="p-3">
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
          <img class="preview" :src="imageData" />
        </div>
      </div>
    </div>
    <div class="flex p-3">
      <button @click="addProduct" class="border p-3">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      selectedCategory: "",
      productTitle: "",
      productPrice: "",
      isTopProduct: false,
      imageData: "",
    };
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
    addProduct() {
      this.$emit("addedProduct", {
        category: this.selectedCategory,
        title: this.productTitle,
        price: this.productPrice,
        isTopProduct: this.isTopProduct,
        image: this.imageData,
      });
    },
  },
};
</script>

<style>
</style>
