<template>
  <div class="categories">
    <div class="uppercase mb-4">Categories</div>
    <div class="px-8 py-2 bg-grey content rounded">
      <div v-for="(category,i) in cateData" :key="i" @click="showByCategory(category.Value,i)">
        <div
          class="list py-3 cursor-pointer font-medium"
          :class="{ active: activeIndex === i }"
        >{{category.Name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      activeIndex: 0,
    };
  },
  props: ["cateData"],
  methods: {
    showByCategory(cateValue, i) {
      this.activeIndex = i;
      this.$emit("selectedCategory", cateValue);
    },
  },
};
</script>

<style>
</style>
