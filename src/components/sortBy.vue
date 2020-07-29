<template>
  <div class="sortBy">
    <div class="flex customSelect">
      <select
        class="border w-full p-2 px-4 border-r-0 cursor-pointer"
        v-model="selectedSort"
        @change="sortBy"
      >
        <option value disabled>Sortby</option>
        <option value="hl">High to Low</option>
        <option value="lh">Low to High</option>
      </select>
      <span class="border border-l-0">
        <font-awesome-icon :icon="['fa', 'chevron-down']" class="text-gray" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortBy",
  data() {
    return {
      selectedSort: "",
    };
  },
  methods: {
    sortBy() {
      this.$emit("selectedSort", this.selectedSort);
    },
  },
  props: ["productsData"],
};
</script>

<style>
</style>
