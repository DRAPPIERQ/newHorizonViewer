<template>
  <div
    ref="catchphrasesRef"
    class="
      relative
      flex flex-col
      align-center
      space-y-2
      scrollbar-thumb-rounded-full
      scrollbar-thumb-blueGray-600
      scrollbar-track-rounded-full
      scrollbar-track-blueGray-200
      h-20
      mr-2
    "
    :class="needScrollbar ? 'overflow-y-scroll scrollbar-thin' : ''"
  >
    <div
      v-for="(catchphrase, index) in catchphrases"
      :key="index"
      class="border-l-2 px-2 border-blueGray-400 font-ligth italic"
    >
      "{{ catchphrase }}"
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  catchphrases: {
    type: Array,
    default: () => [],
  },
});
const catchphrasesRef = ref(null);
let needScrollbar = computed(() => {
  if (!catchphrasesRef.value) return false;
  return (
    catchphrasesRef.value.scrollHeight > catchphrasesRef.value.clientHeight
  );
});
</script>

<style></style>
