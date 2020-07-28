<template>
  <transition name="top">
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-center">
          <div class="modal-container px-5">
            <div class="modal-content rounded-lg">
              <div class="modal-close mainGradient" @click="closeModal">x</div>
              <div class="px-20 py-10">
                <h1 class="text-center font-bold text-4xl">{{title}}</h1>
                <div class="pt-16 pb-8">
                  <div class="mb-6">
                    <label class="block text-xl mb-2">Product Category</label>
                    <select class="border w-full p-4" v-model="selectedCategory">
                      <option value disabled>Select</option>
                      <option value="Cate_1">Books</option>
                      <option value="Cate_2">Dress</option>
                      <option value="Cate_3">Bags</option>
                      <option value="Cate_4">Mobiles</option>
                    </select>
                  </div>
                  <div class="mb-6">
                    <label class="block text-xl mb-2">Product Title</label>
                    <input
                      type="text"
                      class="border w-full p-4"
                      placeholder="Enter product title"
                      v-model="productTitle"
                    />
                  </div>
                  <div class="mb-6">
                    <label class="block text-xl mb-2">Price</label>
                    <input
                      type="text"
                      class="border w-full p-4"
                      placeholder="Enter product price"
                      v-model="productPrice"
                    />
                  </div>
                  <div class="mb-6">
                    <input type="checkbox" id="topProducts" v-model="isTopProduct" />
                    <label for="topProducts" class="text-xl">Top Products</label>
                  </div>
                  <div>
                    <label class="block text-xl mb-3">Upload Product Image</label>
                    <div class="image-preview border" v-if="imageData.length">
                      <div class="close mainGradient" @click="imageData = ''">x</div>
                      <img class="preview" :src="imageData" />
                    </div>
                    <div class="upload-btn-wrapper mb-6" v-else>
                      <button class="btn p-2 px-8 text-sm rounded">Upload</button>
                      <input
                        type="file"
                        name="myfile"
                        class="cursor-pointer"
                        @change="selectedImage"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <hr class="py-6" />
                <div class="flex justify-center">
                  <button
                    class="bg-black text-white p-2 px-8 w-40 mr-8 rounded uppercase"
                    @click="closeModal"
                  >Cancel</button>
                  <button
                    @click="saveProduct"
                    class="p-2 px-8 w-40 mainGradient text-white rounded border-none uppercase"
                  >Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
      isModalOpen: true,
    };
  },
  props: ["exist", "existIndex", "title"],
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
      this.$emit("closeModal", false);
    },
  },
};
</script>

<style>
</style>
