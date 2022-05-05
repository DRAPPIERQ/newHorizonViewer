<template>
  <div
    v-if="!pending && clothes.length > 0"
    class="flex flex-row overflow-x-auto"
  >
    <div
      v-for="(cloth, index) in clothes.filter((e) => e.vill_equip)"
      :key="index"
    >
      <div class="mx-1 px-2 border rounded-full h-18 w-18 p-2">
        <img
          class="object-cover h-auto w-full"
          v-if="cloth && cloth.variations"
          :src="
            cloth.variations.filter((e) => e.colors.includes(color))[0]
              .image_url
          "
        />
      </div>
    </div>
  </div>
  <div v-else>Loading</div>
</template>

<script setup>
// Props
const props = defineProps({
  clothes: {
    type: Array,
    default: () => [],
  },
  pending: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: '',
  },
});
</script>
