<template>
  <div class="flex flex-col space-y-1 p-2 justify-start space-y-2 pb-4">
    <div
      class="flex flex-row font-medium items-center border-b border-blueGray-800 text-blueGray-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <p class="currentColor">Authenticity</p>
    </div>
    <div class="flex flex-col items-center align-center text-blueGray-800">
      <p class="currentColor">
        {{ authenticity }}
      </p>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  authenticity: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
