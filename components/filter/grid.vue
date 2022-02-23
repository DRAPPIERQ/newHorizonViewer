<template>
  <!-- <div class="flex flex-col items-start rounded px-1 pt-2"></div> -->
  <div class="flex flex-row items-start rounded px-1 py-2">
    <filter-month
      v-model:filters="filters"
      @click="monthFilterForm = !monthFilterForm"
      buttonMode
    />
    <filter-month v-for="month in filters.months" :key="month.id" badgeMode />
  </div>

  <div
    v-show="monthFilterForm"
    class="flex flex-row items-start rounded px-1 pt-2"
  >
    <filter-month
      v-model:filters="filters"
      @close="monthFilterForm = false"
      formMode
    />
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      search: '',
      months: [],
    }),
  },
});

const monthFilterForm = ref(false);
</script>
