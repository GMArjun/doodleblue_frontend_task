<template>
  <div class="topProducts">
    <div
      class="uppercase mb-4 text-sm font-medium text-gray"
      v-if="generateTopProducts && generateTopProducts.length"
    >Top Products</div>
    <div class="topItems">
      <div class="flex py-4 cursor-pointer" v-for="(product,i) in generateTopProducts" :key="i">
        <img :src="product.image" class="h-20 w-20 object-cover rounded mr-3" />
        <div class="overflow-hidden">
          <div class="text-lg font-medium truncate">{{product.title}}</div>
          <div v-if="product.rating" class="text-xs mb-2 text-yellow">
            <font-awesome-icon
              v-for="(rating) in product.rating"
              :key="rating"
              :icon="['fa', 'star']"
              class="rating__icon rating__icon--none fa fa-star mr-1"
            />
          </div>
          <div class="text-sm">${{product.price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopProduct",
  props: ["productsData"],
  computed: {
    generateTopProducts() {
      return this.productsData.filter(
        (product) => product.isTopProduct == true
      );
    },
  },
};
</script>

<style>
</style>
