<template>
  <div class="flex flex-col rounded-md shadow-md p-2 divide-y">
    <div class="flex flex-row items-center rounded px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-blueGray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        id="search"
        name="search"
        type="text"
        class="flex-1 placeholder-blueGray-400 text-blueGray-800 rounded p-2 h-10 focus:outline-none"
        :class="search ? '' : 'font-ligth'"
        :value="search"
        :placeholder="placeholder"
        @input="
          (e) => {
            search = e.target.value;
            emit('update:filters', {
              ...props.filters,
              search,
            });
          }
        "
      />
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      search: '',
    }),
  },
  placeholder: {
    type: String,
    default: 'Research what you want ...',
  },
});
// Emits
const emit = defineEmits(['update:filters']);
// Refs
const search = ref(props.filters.search || '');
</script>

<style></style>
