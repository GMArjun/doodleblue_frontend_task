<template>
  <transition name="top">
    <div class="modal text-black">
      <div class="modal-wrapper">
        <div class="modal-center">
          <div class="modal-container px-5">
            <div class="modal-content rounded-lg">
              <div class="modal-close" @click="closeModal">
                <span class="closeI"></span>
              </div>

              <div class="px-6 sm:px-20 py-20 sm:py-40" v-if="isDone">
                <div class="text-green flex flex-col justify-center items-center text-center">
                  <font-awesome-icon :icon="['fa', 'thumbs-up']" class="text-6xl" />
                  <div
                    class="text-2xl mt-6 uppercase font-mons font-medium"
                  >Product {{this.exist ? "Edited" : "Added"}} Successfully</div>
                </div>
              </div>

              <div class="px-6 sm:px-20 py-8 sm:py-10" v-else>
                <h1 class="text-center font-medium text-3xl sm:text-4xl font-roboto">{{title}}</h1>
                <div class="pt-6 sm:pt-16 pb-8 font-mons">
                  <div class="mb-6" :class="{ 'hasError': $v.selectedCategory.$error }">
                    <label class="block text-lg mb-2">Product Category</label>
                    <div class="flex customSelect">
                      <select
                        class="border w-full p-3 sm:p-4 border-r-0"
                        v-model="selectedCategory"
                      >
                        <option value disabled>Select</option>
                        <option value="Cate_1">Books</option>
                        <option value="Cate_2">Dress</option>
                        <option value="Cate_3">Bags</option>
                        <option value="Cate_4">Mobiles</option>
                      </select>
                      <span class="border border-l-0">
                        <font-awesome-icon :icon="['fa', 'chevron-down']" class="text-gray" />
                      </span>
                    </div>

                    <div
                      v-if="$v.selectedCategory.$error"
                      class="text-sm text-red mt-2 text-right font-roboto"
                    >Product Category is Required *</div>
                  </div>
                  <div class="mb-6" :class="{ 'hasError': $v.productTitle.$error }">
                    <label class="block text-lg mb-2">Product Title</label>
                    <input
                      type="text"
                      class="border w-full p-3 sm:p-4 focus:outline-"
                      placeholder="Enter product title"
                      v-model="productTitle"
                    />
                    <div
                      v-if="$v.productTitle.$error"
                      class="text-sm text-red mt-2 text-right font-roboto"
                    >Product Title is Required *</div>
                  </div>
                  <div class="mb-6" :class="{ 'hasError': $v.orgPrice.$error }">
                    <label class="block text-lg mb-2">Original Price</label>
                    <input
                      type="text"
                      class="border w-full p-3 sm:p-4"
                      placeholder="Enter original price"
                      v-model="orgPrice"
                    />
                    <div
                      v-if="!$v.orgPrice.decimal"
                      class="text-sm text-red mt-2 text-right font-roboto"
                    >Requires Number Only *</div>
                  </div>
                  <div class="mb-6" :class="{ 'hasError': $v.productPrice.$error }">
                    <label class="block text-lg mb-2">Sales Price</label>
                    <input
                      type="number"
                      class="border w-full p-3 sm:p-4"
                      placeholder="Enter product price"
                      v-model="productPrice"
                    />
                    <div
                      v-if="$v.productPrice.$error"
                      class="text-sm text-red mt-2 text-right font-roboto"
                    >Product Price is Required *</div>
                  </div>

                  <div class="mb-6">
                    <label class="block text-lg mb-2">Product Rating</label>
                    <div id="full-stars">
                      <div class="rating-group">
                        <input
                          class="rating__input rating__input--none"
                          name="rating"
                          id="rating-none"
                          value="0"
                          type="radio"
                          v-model="ratingValue"
                        />
                        <label aria-label="No rating" class="rating__label" for="rating-none">
                          <font-awesome-icon
                            :icon="['fa', 'ban']"
                            class="rating__icon rating__icon--none fa fa-ban"
                          />
                        </label>
                        <label aria-label="1 star" class="rating__label" for="rating-1">
                          <font-awesome-icon
                            :icon="['fa', 'star']"
                            class="rating__icon rating__icon--star"
                          />
                        </label>
                        <input
                          class="rating__input"
                          name="rating"
                          id="rating-1"
                          value="1"
                          type="radio"
                          v-model="ratingValue"
                        />
                        <label aria-label="2 stars" class="rating__label" for="rating-2">
                          <font-awesome-icon
                            :icon="['fa', 'star']"
                            class="rating__icon rating__icon--star"
                          />
                        </label>
                        <input
                          class="rating__input"
                          name="rating"
                          id="rating-2"
                          value="2"
                          type="radio"
                          v-model="ratingValue"
                        />
                        <label aria-label="3 stars" class="rating__label" for="rating-3">
                          <font-awesome-icon
                            :icon="['fa', 'star']"
                            class="rating__icon rating__icon--star"
                          />
                        </label>
                        <input
                          class="rating__input"
                          name="rating"
                          id="rating-3"
                          value="3"
                          type="radio"
                          v-model="ratingValue"
                        />
                        <label aria-label="4 stars" class="rating__label" for="rating-4">
                          <font-awesome-icon
                            :icon="['fa', 'star']"
                            class="rating__icon rating__icon--star"
                          />
                        </label>
                        <input
                          class="rating__input"
                          name="rating"
                          id="rating-4"
                          value="4"
                          type="radio"
                          v-model="ratingValue"
                        />
                        <label aria-label="5 stars" class="rating__label" for="rating-5">
                          <font-awesome-icon
                            :icon="['fa', 'star']"
                            class="rating__icon rating__icon--star"
                          />
                        </label>
                        <input
                          class="rating__input"
                          name="rating"
                          id="rating-5"
                          value="5"
                          type="radio"
                          v-model="ratingValue"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="mb-6">
                    <input type="checkbox" id="topProducts" v-model="isTopProduct" />
                    <label for="topProducts" class="text-lg">Top Products</label>
                  </div>

                  <div>
                    <div class="image-preview border border-greyish" v-if="imageData.length">
                      <div class="close" @click="imageData = ''">
                        <span class="closeI"></span>
                      </div>
                      <img class="preview" :src="imageData" />
                    </div>
                    <div v-else>
                      <label class="block text-lg mb-3">Upload Product Image</label>
                      <div class="upload-btn-wrapper inline">
                        <button class="btn focus:outline-none p-2 px-8 text-sm rounded">Upload</button>
                        <input
                          type="file"
                          name="myfile"
                          class="cursor-pointer"
                          @change="selectedImage"
                          accept="image/*"
                        />
                      </div>
                      <div
                        v-if="$v.imageData.$error"
                        class="text-sm text-red mt-2 font-roboto"
                      >Product Image is Required *</div>
                    </div>
                  </div>
                </div>
                <hr class="py-3 sm:py-6 border-greyish" />
                <div class="flex justify-center">
                  <button
                    class="bg-greyish font-mons p-3 px-6 sm:px-8 w-40 mr-3 sm:mr-8 rounded uppercase focus:outline-none"
                    @click="closeModal"
                  >Cancel</button>
                  <button
                    @click="saveProduct"
                    class="p-3 px-6 sm:px-8 w-40 font-mons mainGradient text-white rounded border-none uppercase focus:outline-none"
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
import { required, decimal } from "vuelidate/lib/validators";

export default {
  name: "ProductController",
  data() {
    return {
      selectedCategory: "",
      productTitle: "",
      orgPrice: "",
      productPrice: "",
      isTopProduct: false,
      ratingValue: 0,
      imageData: "",
      isModalOpen: true,
      isDone: false,
    };
  },
  props: ["exist", "existIndex", "title"],
  mounted() {
    if (this.exist) {
      this.selectedCategory = this.exist.category;
      this.productTitle = this.exist.title;
      this.orgPrice = this.exist.originalPrice;
      this.productPrice = this.exist.price;
      this.ratingValue = this.exist.rating;
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
    checkValid() {
      this.$v.$touch();
      return this.$v.$anyError;
    },
    saveProduct() {
      const ProductData = {
        category: this.selectedCategory,
        title: this.productTitle,
        originalPrice: parseFloat(this.orgPrice),
        price: parseFloat(this.productPrice),
        rating: parseInt(this.ratingValue),
        isTopProduct: this.isTopProduct,
        image: this.imageData,
      };
      if (!this.checkValid()) {
        if (this.existIndex != undefined) {
          this.$emit("productDataBack", {
            prodData: ProductData,
            index: this.existIndex,
          });
        } else {
          this.$emit("productDataBack", ProductData);
        }
        this.isDone = true;
      }
    },
    closeModal() {
      this.$emit("closeModal", false);
    },
  },
  validations: {
    productTitle: {
      required,
    },
    selectedCategory: {
      required,
    },
    orgPrice: {
      decimal,
    },
    productPrice: {
      required,
      decimal,
    },
    imageData: {
      required,
    },
  },
};
</script>

<style>
</style>
