<template>
  <div class="priceRange">
    <div class="uppercase mb-1 lg:mb-4 text-sm font-medium text-gray">Filter by Price</div>
    <vue-slider v-model="pRange" :tooltip="'none'" :min="1" :max="maxPrice"></vue-slider>
    <div class="mt-3 mb-0 lg:my-4 text-sm flex">
      <button
        @click="filter"
        class="p-1 px-4 mainGradient text-white rounded border-none focus:outline-none mr-auto"
      >Filter</button>
      <div class="text-sm ml-3 self-center" v-if="selectedRange && selectedRange.length">
        <span class="mr-1 text-gray">Price:</span>
        <span class="text-black">${{selectedRange[0]}} - ${{selectedRange[1]}}</span>
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
      selectedRange: null,
    };
  },
  props: ["productsData"],
  components: {
    VueSlider,
  },
  methods: {
    filter() {
      this.$emit("filterRange", this.selectedRange);
    },
  },
  watch: {
    pRange: function (newVal) {
      this.selectedRange = [1, newVal[1]];
    },
  },
  mounted() {
    this.selectedRange = [1, this.maxPrice];
  },
  computed: {
    maxPrice() {
      return Math.ceil(
        Math.max.apply(
          Math,
          this.productsData.map(function (o) {
            return o.price;
          })
        )
      );
    },
    pRange: {
      get() {
        return [1, this.maxPrice];
      },
      set(rValue) {
        this.selectedRange = rValue;
      },
    },
  },
};
</script>

<style>
</style>
