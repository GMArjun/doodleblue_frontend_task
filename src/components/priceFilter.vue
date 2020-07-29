<template>
  <div class="priceRange">
    <div class="uppercase mb-4 text-sm font-medium text-gray">Filter by Price</div>

    <vue-slider v-model="pRange" :tooltip="'none'" :min="1"></vue-slider>
    <div class="my-4 text-sm flex">
      <button
        class="p-1 px-4 mainGradient text-white rounded border-none focus:outline-none mr-auto"
      >Filter</button>
      <div class="text-sm ml-3 self-center">
        <span class="mr-1 text-gray">Price:</span>
        <span class="text-black">${{pRange[0]}} - ${{pRange[1]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  name: "PriceFilter",
  data() {
    return {
      pRange: [1, 50],
    };
  },
  props: ["productsData"],
  components: {
    VueSlider,
  },
};
</script>

<style>
</style>
