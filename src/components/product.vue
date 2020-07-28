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
  name: "Product",
  data() {
    return {};
  },
  props: [],
  methods: {
  },
};
</script>

<style>
</style>
