<template>
  <div class="relative flex flex-col">
    <filter-search
      class="bg-white"
      v-if="!noFilter"
      v-model:filters="filters"
      placeholder="Research an art ..."
    />
    <div
      v-if="!pending"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
    >
      <div
        v-for="(item, index) in filterItems"
        :key="index"
        class="bg-white flex flex-col rounded-md shadow-md p-2"
      >
        <!-- Art Icon/Name -->
        <div class="flex flex-col items-center space-y-1">
          <div class="flex flex-row">
            <div class="relative">
              <img :src="item.image_url" class="h-auto w-full object-cover" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute bottom-0 right-0 h-6 w-6 text-green-500 bg-green-50 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div v-if="item.has_fake" class="relative">
              <img
                :src="item.fake_image_url"
                class="h-auto w-full object-cover"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute bottom-0 right-0 h-6 w-6 text-red-500 bg-red-50 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p class="font-medium text-blueGray-800">{{ item.name }}</p>
        </div>

        <!-- Fish Prices -->
        <div
          class="flex flex-row items-center justify-center divide-x divide-blueGray-600 p-1 mt-2"
        >
          <div class="inline-flex items-center justify-center px-2">
            <p class="text-blueGray-600 font-ligth mr-2">
              Buy to {{ item.availability }} for
            </p>
            <p class="text-blueGray-800 font-medium text-lg">
              {{ item.buy }}
            </p>
            <img src="~/assets/Bells.png" class="w-6 h-6" />
          </div>
        </div>

        <div class="flex justify-center mt-2">
          <div class="w-1/5 border-b border-blueGray-600" />
        </div>

        <div
          class="flex flex-row items-center justify-center divide-x divide-blueGray-600 p-1 mt-2"
        >
          <div class="inline-flex items-center justify-center px-2">
            <p class="text-blueGray-600 font-ligth mr-2">Sell to Nook for</p>
            <p class="text-blueGray-800 font-medium text-lg">
              {{ item.sell }}
            </p>
            <img src="~/assets/Bells.png" class="w-6 h-6" />
          </div>
        </div>

        <!-- Fish Catchphrases -->
        <art-authenticity
          class="flex-1 mt-2"
          :authenticity="item.authenticity"
        />

        <!-- Fish spawn months -->
        <!-- <div class="flex flex-col justify-center mt-2 rounded-lg shadow">
          <div class="grid grid-cols-2">
            <div
              class="flex flex-row w-full items-center justify-center p-1 rounded-tr rounded-tl cursor-pointer select-none"
              :class="[
                !item?.isSouth
                  ? 'border-t border-r border-l'
                  : 'bg-blueGray-100 border-b',
              ]"
              @click="item.isSouth = false"
            >
              <img src="~/assets/North.png" class="w-5 h-5 mr-1" />
              North
            </div>
            <div
              class="flex flex-row w-full items-center justify-center p-1 rounded-tr rounded-tl cursor-pointer select-none"
              :class="[
                item?.isSouth
                  ? 'border-t border-r border-l'
                  : 'bg-blueGray-100 border-b',
                ,
              ]"
              @click="item.isSouth = true"
            >
              <img src="~/assets/South.png" class="w-5 h-5 mr-1" />
              South
            </div>
          </div>
          <div
            class="flex flex-col border-b border-l rounded-bl-lg border-r rounded-br-lg p-2"
          >
            <data-table-spawn-months
              :spawns="
                !item?.isSouth
                  ? item.north.times_by_month
                  : item.south.times_by_month
              "
            />
          </div>
        </div> -->
      </div>
    </div>
    <div v-else class="flex flex-row my-4 justify-center">
      <div
        class="bg-white flex flex-row rounded-md shadow-md p-2 w-2/5 items-center justify-center"
      >
        <div>
          <svg
            class="h-12 w-12 mr-2 text-blueGray-700 animate-loading"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            ></path>
            <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <div>
          <p class="font-medium text-lg text-blueGray-700">Loading ...</p>
          <p class="font-ligth text-blueGray-600">
            {{
              pendingRandomItem[
                randomIntFromInterval(0, pendingRandomItem.length - 1)
              ]
            }}
            in progress. Please wait.
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

// min and max included
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Pending items
const pendingRandomItem = computed(() => [
  'Painting',
  'Sculpting',
  'Sketching',
]);

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
  const { search, months } = filters.value;
  let items = sortItems.value.map((e, i) => {
    return {
      number: i + 1,
      ...e,
    };
  });
  if (search != '') {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  return items;
});
</script>

<style></style>
