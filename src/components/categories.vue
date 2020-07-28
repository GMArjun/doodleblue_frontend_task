<template>
  <div>
    <div class="uppercase">Categories</div>
    <div
      v-for="(category,ci) in cateData"
      :key="ci"
      @click="showByCategory(category.Value)"
    >{{category.Name}}</div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {};
  },
  props: ["cateData"],
  methods: {
    showByCategory(cateValue) {
      console.log(cateValue);
    },
  },
};
</script>

<style>
</style>
