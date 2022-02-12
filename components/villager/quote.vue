<template>
  <div
    class="relative flex flex-col align-center space-y-2 h-20 mr-2 border-l-2 border-blueGray-400"
  >
    <div class="px-2 font-ligth italic">"{{ quote }}"</div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  quote: {
    type: String,
    default: '',
  },
});
</script>

<style></style>
