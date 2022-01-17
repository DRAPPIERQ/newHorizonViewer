<template>
  <div class="flex flex-wrap items-center p-2 text-sm">
    <layout-slot-modal
      :showModal="isAddingFilter"
      @click-outside="closeFilterModal"
      @finish="addMoreFilter"
      :disable-finish="false"
      @cancel="closeFilterModal"
    >
      <div class="flex-col p-2">
        <p class="font-medium text-lg text-blueGray-800">Add a filter</p>
        <div class="w-full h-10 relative">
          <select
            @change="selectOption"
            class="
              absolute
              top-0
              left-0
              w-full
              border border-blueGray-800
              rounded
              pr-3
              h-10
              focus:outline-none
            "
            :class="
              optionSelected
                ? 'text-blueGray-800 pl-8'
                : 'text-blueGray-400 pl-2'
            "
            style="background: transparent"
          >
            <option value="" selected>Select a filter</option>
            <option
              v-for="option in options"
              :key="option.slug"
              :value="option.slug"
            >
              {{ option.label }}
            </option>
          </select>
          <div class="p-2">
            <svg
              v-if="optionSelected?.type === 'time-range'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blueGray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <div v-if="optionSelected" class="w-full border-b my-3"></div>

        <div v-if="optionSelected?.type === 'time-range'">
          <form-input-select-range
            v-if="['time-range'].includes(optionSelected.type)"
            :options="optionSelected.range"
            :options2="
              optionSelected.range2
                ? optionSelected.range2
                : optionSelected.range
            "
            @change:selectedOption="updateSelected"
            @change:selectedHemisphere="updateSelectedHemisphere"
            hemisphere
          />
        </div>
      </div>
    </layout-slot-modal>
    <div
      class="
        group
        inline-flex
        items-center
        border border-blueGray-600
        text-blueGray-600
        hover:bg-red-50 hover:text-red-600 hover:border-red-600
        rounded-full
        px-2
        mr-2
        cursor-pointer
      "
      v-for="(moreFilter, index) in moreFilters"
      :key="index"
    >
      <div
        v-if="
          ['time-range'].includes(moreFilter.type) && !moreFilter.cumulative
        "
        class="flex flex-row items-center space-x-2"
        @click="removeMoreFilter(moreFilter)"
      >
        <svg
          v-if="moreFilter?.type === 'time-range' && !moreFilter?.hemisphere"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <div v-if="moreFilter?.hemisphere === 'north'" class="flex flex-row">
          <img src="~/assets/North.png" class="w-4 h-4" />
        </div>
        <div v-if="moreFilter?.hemisphere === 'south'" class="flex flex-row">
          <img src="~/assets/South.png" class="w-4 h-4" />
        </div>
        <p v-if="moreFilter.value.from.id != moreFilter.value.to.id">
          {{ moreFilter.value.from.label }} - {{ moreFilter.value.to.label }}
        </p>
        <p v-else>
          {{ moreFilter.value.from.label }}
        </p>
      </div>
    </div>
    <div
      class="
        inline-flex
        items-center
        border border-blueGray-600
        text-blueGray-600
        hover:bg-green-50 hover:text-green-600 hover:border-green-600
        rounded-full
        px-2
        cursor-pointer
      "
      @click="openFilterModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <p>Add a filter</p>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  moreFilters: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Array,
    default: () => [],
  },
});
// Emits
const emit = defineEmits(["update:moreFilters"]);

// Create filter
const isAddingFilter = ref(false);
const optionSelected = ref(null);

const selectOption = (event) => {
  optionSelected.value = props.options.filter(
    (opt) => opt.slug === event.target.value
  )[0];
};
const updateSelected = (value) => {
  optionSelected.value.values = value;
};
const updateSelectedHemisphere = (value) => {
  optionSelected.value.hemisphere = value;
};

// Add created filter
const addMoreFilter = () => {
  let newFilters = { ...props.filters };
  const slug = optionSelected.value.slug;
  const newFilter = {
    slug,
    type: optionSelected.value.type,
    cumulative: optionSelected.value.cumulative,
  };

  if (!newFilters[slug]) {
    newFilters[slug] = newFilter;
  }

  if (newFilters[slug].cumulative) {
    newFilters[slug].values.push(optionSelected.value.values);
  } else {
    newFilters[slug].value = optionSelected.value.values;
  }

  if (optionSelected.value.hemisphere) {
    newFilters[slug].hemisphere = optionSelected.value.hemisphere;
  }

  console.log(newFilters[slug]);
  emit("update:moreFilters", newFilters);
  closeFilterModal();
};

// Remove created filter
const removeMoreFilter = (filter) => {
  let newFilters = { ...props.filters };
  delete newFilters[filter.slug];
  emit("update:moreFilters", newFilters);
};

// Close and Open filter modal
const openFilterModal = () => {
  isAddingFilter.value = true;
  optionSelected.value = null;
};
const closeFilterModal = () => {
  isAddingFilter.value = false;
  optionSelected.value = null;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
