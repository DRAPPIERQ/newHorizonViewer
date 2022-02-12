<template>
  <div class="border rounded">
    <div
      v-for="(spawn, index) in spawns"
      :key="index"
      class="grid grid-cols-2 first:rounded-tr first:rounded-tl last:rounded-br lats:rounded-bl"
      :class="
        spawn.toLowerCase() !== 'na'
          ? index % 2
            ? 'bg-green-50'
            : 'bg-green-100'
          : index % 2
          ? 'bg-white'
          : 'bg-blueGray-50'
      "
    >
      <div>
        {{ getMonthName(index - 1) }}
      </div>
      <div class="inline-flex align-center justify-center">
        <!-- {{ isAvailable(index) ? spawn : '–' }} -->
        {{ spawn.toLowerCase() !== 'na' ? spawn : '–' }}
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  spawns: {
    type: Object,
    default: () => ({}),
  },
});

const getMonthName = (monthNb) =>
  new Date(0, monthNb).toLocaleString('en', { month: 'long' });
</script>

<style></style>
