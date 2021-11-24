<template>
  <div class="flex w-full h-screen">
    <layout-sidebar class="w-44 h-full" />
    <div id="body" class="flex-1 bg-gray-100 p-6 overflow-y-scroll">
      <slot class="bg-gray-50" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style>
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
