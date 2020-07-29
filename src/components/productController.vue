<template>
  <transition name="top">
    <div class="modal text-black">
      <div class="modal-wrapper">
        <div class="modal-center">
          <div class="modal-container px-5">
            <div class="modal-content rounded-lg">
              <div class="modal-close" @click="closeModal"> <span class="closeI"></span>  </div>
              <div class="px-20 py-10">
                <h1 class="text-center font-medium text-4xl font-roboto">{{title}}</h1>
                <div class="pt-16 pb-8 font-mons">
                  <div class="mb-6">
                    <label class="block text-lg mb-2">Product Category</label>
                    <select class="border w-full p-4" v-model="selectedCategory">
                      <option value disabled>Select</option>
                      <option value="Cate_1">Books</option>
                      <option value="Cate_2">Dress</option>
                      <option value="Cate_3">Bags</option>
                      <option value="Cate_4">Mobiles</option>
                    </select>
                  </div>
                  <div class="mb-6">
                    <label class="block text-lg mb-2">Product Title</label>
                    <input
                      type="text"
                      class="border w-full p-4 focus:outline-"
                      placeholder="Enter product title"
                      v-model="productTitle"
                    />
                  </div>
                  <div class="mb-6">
                    <label class="block text-lg mb-2">Original Price</label>
                    <input
                      type="text"
                      class="border w-full p-4"
                      placeholder="Enter original price"
                      v-model="orgPrice"
                    />
                  </div>
                  <div class="mb-6">
                    <label class="block text-lg mb-2">Price</label>
                    <input
                      type="text"
                      class="border w-full p-4"
                      placeholder="Enter product price"
                      v-model="productPrice"
                    />
                  </div>
                  <div class="mb-6">
                    <input type="checkbox" id="topProducts" v-model="isTopProduct" />
                    <label for="topProducts" class="text-lg">Top Products</label>
                  </div>
                  <div>
                    <div class="image-preview border border-greyish" v-if="imageData.length">
                      <div class="close" @click="imageData = ''"> <span class="closeI"></span> </div>
                      <img class="preview" :src="imageData" />
                    </div>
                    <div v-else>
                      <label class="block text-lg mb-3">Upload Product Image</label>
                      <div class="upload-btn-wrapper mb-6">
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
                </div>
                <hr class="py-6 border-greyish" />
                <div class="flex justify-center">
                  <button
                    class="bg-greyish font-mons p-2 px-8 w-40 mr-8 rounded uppercase"
                    @click="closeModal"
                  >Cancel</button>
                  <button
                    @click="saveProduct"
                    class="p-2 px-8 w-40 font-mons mainGradient text-white rounded border-none uppercase"
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
      orgPrice: "",
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
      this.orgPrice = this.exist.originalPrice;
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
          originalPrice: this.orgPrice,
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
