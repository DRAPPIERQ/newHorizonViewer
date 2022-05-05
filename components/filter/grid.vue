<template>
  <!-- <div class="flex flex-col items-start rounded px-1 pt-2"></div> -->
  <div class="flex flex-row items-start rounded px-1 py-2">
    <!-- @filters="updateFilters" -->
    <filter-month
      v-model:filters="filters"
      @click="monthFilterForm = !monthFilterForm"
      buttonMode
    />
  </div>

  <div
    v-show="monthFilterForm"
    class="flex flex-row items-start rounded px-1 pt-2"
  >
    <!-- @filters="updateFilters" -->
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

// Emits
const emit = defineEmits(['update:filters']);
// Datas
const monthFilterForm = ref(false);

const updateFilters = (filters) => {
  props.filters = filters;
  emit('update:filters', props.filters);
};
</script>
