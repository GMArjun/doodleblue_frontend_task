<template>
  <div class="Dropdown">
    <div class="relative z-10">
      <div class="flex customSelect" @click="inDrop=true">
        <div
          class="border border-greyish bg-grey w-full p-2 pl-3 pr-0 border-r-0 cursor-pointer text-sm rounded-md rounded-r-none"
        >All Filters</div>
        <span class="border border-l-0 rounded-md rounded-l-none">
          <font-awesome-icon :icon="['fa', 'chevron-down']" class="text-gray" />
        </span>
      </div>

      <div class="in-dropdown" v-if="inDrop">
        <slot />
      </div>
    </div>
    <div class="outside" @click.self="inDrop = false" v-if="inDrop"></div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  data() {
    return {
      inDrop: false,
    };
  },
};
</script>

<style scoped>
</style>
