<template>
  <div
    v-if="buttonMode"
    class="inline-flex text-sm text-blueGray-500 hover:text-blueGray-800 border border-blueGray-500 hover:border-blueGray-800 rounded-full px-2 py-0.5 items-center justify-center cursor-pointer"
    @click="() => emit('click')"
  >
    <svg
      v-if="!filters.months"
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 mr-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <div v-else>
      <img
        v-if="!filters.months.isSouth"
        src="~/assets/North.png"
        class="w-5 h-5 mr-1"
      />
      <img
        v-if="filters.months.isSouth"
        src="~/assets/South.png"
        class="w-5 h-5 mr-1"
      />
    </div>

    <p v-if="!filters.months">Select a month</p>
    <p v-else>
      {{ [...new Set(filters.months.values.map((e) => e.name))].join(' - ') }}
    </p>
  </div>
  <div
    v-if="formMode"
    class="flex flex-col text-blueGray-800 px-2 py-0.5 w-full"
  >
    <div class="flex flex-row space-x-4 divide-x">
      <div class="flex flex-col p-2">
        <p class="text-sm">Hemisphere</p>
        <select
          class="rounded p-2 focus:outline-none"
          @change="selectHemisphere"
        >
          <option selected>North</option>
          <option>South</option>
        </select>
      </div>

      <div class="flex flex-grow flex-row justify-evenly p-2">
        <div class="flex flex-col">
          <p class="text-sm">From</p>
          <select class="rounded p-2 focus:outline-none" @change="selectMonth">
            <option value="1" :selected="filters.months.values[0].id === 1">
              January
            </option>
            <option value="2" :selected="filters.months.values[0].id === 2">
              February
            </option>
            <option value="3" :selected="filters.months.values[0].id === 3">
              March
            </option>
            <option value="4" :selected="filters.months.values[0].id === 4">
              April
            </option>
            <option value="5" :selected="filters.months.values[0].id === 5">
              May
            </option>
            <option value="6" :selected="filters.months.values[0].id === 6">
              June
            </option>
            <option value="7" :selected="filters.months.values[0].id === 7">
              July
            </option>
            <option value="8" :selected="filters.months.values[0].id === 8">
              August
            </option>
            <option value="9" :selected="filters.months.values[0].id === 9">
              September
            </option>
            <option value="10" :selected="filters.months.values[0].id === 10">
              October
            </option>
            <option value="11" :selected="filters.months.values[0].id === 11">
              November
            </option>
            <option value="12" :selected="filters.months.values[0].id === 12">
              December
            </option>
          </select>
        </div>

        <div class="flex flex-col">
          <p class="text-sm">To</p>
          <select
            class="rounded p-2 focus:outline-none"
            @change="selectSecondeMonth"
          >
            <option value="1" :selected="filters.months.values[1].id === 1">
              January
            </option>
            <option value="2" :selected="filters.months.values[1].id === 2">
              February
            </option>
            <option value="3" :selected="filters.months.values[1].id === 3">
              March
            </option>
            <option value="4" :selected="filters.months.values[1].id === 4">
              April
            </option>
            <option value="5" :selected="filters.months.values[1].id === 5">
              May
            </option>
            <option value="6" :selected="filters.months.values[1].id === 6">
              June
            </option>
            <option value="7" :selected="filters.months.values[1].id === 7">
              July
            </option>
            <option value="8" :selected="filters.months.values[1].id === 8">
              August
            </option>
            <option value="9" :selected="filters.months.values[1].id === 9">
              September
            </option>
            <option value="10" :selected="filters.months.values[1].id === 10">
              October
            </option>
            <option value="11" :selected="filters.months.values[1].id === 11">
              November
            </option>
            <option value="12" :selected="filters.months.values[1].id === 12">
              December
            </option>
          </select>
        </div>
      </div>

      <div class="flex flex-row-reverse pl-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 hover:text-red-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="() => emit('close')"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
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
      months: null,
    }),
  },
  month: {
    type: Object,
    default: () => ({}),
  },
  buttonMode: {
    type: Boolean,
    default: false,
  },
  formMode: {
    type: Boolean,
    default: false,
  },
});
// Emits
const emit = defineEmits(['close', 'click', 'update:filters']);
// Datas
const monthFilter = useMonthFilter([1, 12], false);
props.filters.months = monthFilter.value;
emit('update:filters', props.filters);

const selectHemisphere = (e) => {
  monthFilter.value.setHemisphere(e.target.value.toLowerCase() === 'south');
  props.filters.months = monthFilter.value;
  emit('update:filters', props.filters);
};

const selectMonth = (e) => {
  monthFilter.value.setMonthFrom(e.target.value, 0);
  props.filters.months = monthFilter.value;
  emit('update:filters', props.filters);
};

const selectSecondeMonth = (e) => {
  monthFilter.value.setMonthTo(e.target.value, 1);
  props.filters.months = monthFilter.value;
  emit('update:filters', props.filters);
};
</script>
