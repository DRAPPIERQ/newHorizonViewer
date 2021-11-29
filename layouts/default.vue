<template>
  <div class="flex w-full h-screen">
    <layout-sidebar class="w-44 h-full" />
    <div
      id="body"
      class="relative flex-1 bg-blueGray-100 p-6 overflow-y-scroll"
    >
      <slot class="bg-blueGray-50" />
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
  -moz-osx-font-smoothing: blueGrayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
