<template>
  <div class="flex flex-col">
    <data-table-filter
      class="bg-white"
      v-if="!noFilter"
      v-model:filters="filters"
      placeholder="Research a sea creature ..."
    />
    <!-- {{ filters }} -->
    <div
      v-if="!pending"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
    >
      <div
        v-for="item in filterItems"
        :key="item.id"
        class="bg-white flex flex-col rounded-md shadow-md p-2"
      >
        <!-- <img :src="item.nh_details?.image_url" class="h-24 object-cover m-2" /> -->
        <!-- Villager Icon/Name -->
        <div class="flex flex-col items-center space-y-1">
          <img
            :src="item.nh_details?.icon_url"
            class="w-12 h-12 object-cover border rounded-full"
            :style="{
              backgroundColor: `rgba(
                ${item.text_color_rgba.r - 10},
                ${item.text_color_rgba.g - 10},
                ${item.text_color_rgba.b - 10},
                ${item.text_color_rgba.a - 0.2})`,
              borderColor: `rgba(
                ${item.text_color_rgba.r - 10},
                ${item.text_color_rgba.g - 10},
                ${item.text_color_rgba.b - 10},
                ${item.text_color_rgba.a - 0.2})`,
            }"
          />
          <div class="flex flex-row items-center justify-center">
            <p class="font-medium text-blueGray-800 px-1">
              {{ item.name }}
            </p>
            <svg
              v-if="item.gender === 'Male'"
              xmlns="http://www.w3.org/2000/svg"
              class="text-blue-500 h-auto w-5 px-1"
              fill="currentColor"
              viewBox="0 0 384 512"
            >
              <path
                d="M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c0-6.6-5.4-12-12-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
              ></path>
            </svg>
            <svg
              v-if="item.gender === 'Female'"
              xmlns="http://www.w3.org/2000/svg"
              class="text-pink-500 h-auto w-5 px-1"
              fill="currentColor"
              viewBox="0 0 384 512"
            >
              <path
                d="M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z"
              ></path>
            </svg>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex flex-row">
            <!-- <div
              class="bg-blueGray-200"
              :style="{ color: '#' + item.title_color }"
            >
              title_color
            </div>
            <div
              class="bg-blueGray-200"
              :style="{ color: '#' + item.text_color }"
            >
              text_color
            </div> -->
          </div>
          {{ item }}
        </div>
      </div>
    </div>
    <div v-else class="flex flex-row my-4 justify-center">
      <div
        class="bg-white flex flex-row rounded-md shadow-md p-2 w-2/5 items-center justify-center"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 mr-2 text-blueGray-700 loading-animation"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
        </div>
        <div>
          <p class="font-medium text-lg text-blueGray-700">Loading ...</p>
          <p class="font-ligth text-blueGray-600">
            Searching in progress. Please wait.
          </p>
        </div>
      </div>
    </div>
    <!-- <layout-paginate-footer
      class="bg-white md:col-start-2"
      v-if="!noPaginate"
    /> -->
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  pending: {
    type: Boolean,
    default: true,
  },
  noFilter: {
    type: Boolean,
    default: false,
  },
  noPaginate: {
    type: Boolean,
    default: false,
  },
});

const { rgbToHex, hexToRgba } = useColors();

// Sort items
const sortItems = computed(() =>
  props.data ? props.data.sort((a, b) => a.number - b.number) : []
);

// Filters
const filters = ref({
  search: '',
});

// Filter sorted items
const filterItems = computed(() => {
  const { search } = filters.value;
  let items = sortItems.value;
  if (search != '') {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  return items
    .filter((item) => item.nh_details)
    .map((item) => ({
      text_color_rgba: hexToRgba(item.title_color),
      ...item,
    }));
});
</script>

<style></style>
