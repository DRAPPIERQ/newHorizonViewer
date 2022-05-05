<template>
  <div class="flex flex-col">
    <filter-search
      class="bg-white"
      v-if="!noFilter"
      v-model:filters="filters"
      placeholder="Research a sea creature ..."
    >
      <filter-grid v-model:filters="filters" />
    </filter-search>
    <div
      v-if="!pending"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
    >
      <div
        v-for="item in filterItems"
        :key="item.number"
        class="bg-white flex flex-col rounded-md shadow-md p-2"
      >
        <!-- Sea Creature Icon/Name -->
        <div class="flex flex-col items-center space-y-1">
          <img
            :src="item.image_url"
            class="w-12 h-12 object-cover border border-blueGray-200 bg-blueGray-200 rounded-full"
          />
          <p class="font-medium text-blueGray-800">{{ item.name }}</p>
        </div>

        <!-- Sea Creature Prices -->
        <div
          class="flex flex-row items-center justify-center divide-x divide-blueGray-600 p-1 mt-2"
        >
          <div class="inline-flex items-center justify-center px-2">
            <p class="text-blueGray-600 font-ligth mr-2">Nook</p>
            <p class="text-blueGray-800 font-medium text-lg">
              {{ item.sell_nook }}
            </p>
            <img src="~/assets/Bells.png" class="w-6 h-6" />
          </div>
          <!-- <div class="inline-flex items-center justify-center px-2">
            <p class="text-blueGray-600 font-ligth mr-2">CJ</p>
            <p class="text-blueGray-800 font-medium text-lg">
              {{ item.sell_cj }}
            </p>
            <img src="~/assets/Bells.png" class="w-6 h-6" />
          </div> -->
        </div>

        <!-- Sea Creature Catchphrases -->
        <data-table-catchphrases
          class="mt-2"
          :catchphrases="item.catchphrases"
        />

        <!-- Sea Creature spawn months -->
        <div class="flex flex-col justify-center mt-2 rounded-lg shadow">
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
            class="h-12 w-12 mr-2 text-blueGray-700 animate-loading"
            fill="currentColor"
            viewBox="0 0 128 128"
          >
            <path
              d="m49.43799,7.85665c-21.31704,8.22317 -32.16702,32.18784 -22.97644,50.04386c1.11692,2.08516 -1.45233,13.21601 2.4775,8.52886c3.92984,-4.68714 19.09272,-4.98603 17.84208,5.10889c-1.25064,10.09492 -14.9482,5.86272 -18.4801,-0.6593c-3.5319,-6.52202 -0.417,7.73434 -1.3289,8.98915c-3.6476,5.01924 -2.68059,4.46401 -2.29765,9.16296c0.38294,3.17179 1.02118,6.81349 1.53176,7.87075c0.89354,1.76211 0.5106,1.99706 -2.68059,1.40969c-2.68058,-0.4699 -4.46764,-0.11748 -5.87175,1.29221c-3.06353,2.81937 -2.68059,5.87369 1.40411,10.10275c2.93589,3.05432 4.72294,3.75916 10.5947,4.22906c4.0847,0.35242 7.91411,1.52715 9.44587,2.7019c5.61646,4.69895 15.70057,4.34653 21.57233,-0.58738l3.31882,-2.93684l2.68059,2.46695c5.74412,5.28633 13.91351,5.99117 20.80645,1.64464c3.06352,-1.87958 6.50999,-2.93685 9.82881,-2.93685c8.55234,0 15.18998,-4.81642 15.18998,-11.16001c0,-3.05432 -4.0847,-5.52127 -8.04175,-4.81642c-3.19117,0.58737 -3.57411,0.35242 -2.68059,-1.40969c0.51058,-1.05726 1.27647,-4.81642 1.53176,-8.10569c0.38294,-5.52127 0.12764,-6.57854 -3.19117,-9.51538c-1.40411,-1.35095 -1.84002,-11.9637 -3.61046,-6.6399c-1.77044,5.32381 -15.25361,7.89729 -16.37292,0.03186c-1.11931,-7.86544 12.38779,-11.93615 15.15952,-6.43882c2.77173,5.49734 2.33474,-2.16599 2.78151,-2.69463c0.89354,-1.05726 6.76529,-12.45223 6.76529,-18.67834c0,-15.38908 -10.21176,-30.42573 -24.89115,-36.4169c-9.70117,-3.9941 -21.18939,-4.22906 -30.50762,-0.58737zm28.08232,5.4038c12.5094,5.63874 21.06175,17.85602 21.06175,30.42572c0.12764,8.45812 -1.14882,10.92507 -8.04176,15.38908c-13.65821,9.16296 -35.23055,9.39791 -51.69701,0.58737c-7.65881,-4.22906 -9.57352,-7.28337 -9.44587,-15.85897c0,-12.68718 7.53117,-23.72971 20.67881,-30.0733c7.40352,-3.75916 19.65763,-3.87664 27.44408,-0.46989zm-29.99703,79.0599c-0.76588,0.70484 -1.40411,2.93684 -1.40411,4.9339c0,5.16885 -3.19117,8.81054 -7.78647,8.81054c-2.55293,0 -3.70176,0.58737 -3.70176,1.87958c0,1.52716 -0.89354,1.76212 -4.59529,1.29221c-8.55235,-1.29221 -10.84999,-5.16885 -3.57411,-5.75622c6.63764,-0.46989 8.04175,-3.05432 5.23352,-9.8678c-1.14882,-3.05432 -2.04235,-5.75622 -1.78705,-5.99116c0.25529,-0.11748 3.19117,0.46989 6.50999,1.52715c5.9994,1.87958 6.12706,1.87958 8.80765,-0.82231l2.80823,-2.81938l0.38294,2.81938c0.25529,1.52715 -0.12765,3.28926 -0.89354,3.9941zm36.37938,-3.9941c2.04235,2.11452 2.42529,2.11452 7.65881,0.35242c3.06353,-1.05726 5.87176,-1.64463 6.2547,-1.29221c0.38294,0.35242 -0.38294,3.17179 -1.53176,6.22611c-2.80823,6.81348 -1.40412,9.39791 5.23352,9.8678c5.23353,0.4699 5.74412,1.64464 1.78706,4.22907c-3.70177,2.46695 -9.95646,2.46695 -9.95646,0.11748c0,-1.17475 -1.27648,-1.76212 -3.57411,-1.76212c-4.59529,0 -6.63764,-1.99706 -6.63764,-6.34359c0,-1.99705 -0.89354,-5.16884 -1.91471,-7.04842c-3.44647,-5.99117 -1.53176,-9.04549 2.68059,-4.34653zm-21.44469,5.40379c1.02118,0.93979 -2.68059,15.50654 -4.46764,17.26865c-3.44647,3.52422 -8.67999,4.81643 -12.63705,3.05433c-5.10588,-2.23201 -5.36118,-4.46401 -0.63824,-4.46401c4.97823,0 7.65882,-4.11159 5.36118,-7.98823c-0.76588,-1.29221 -1.40412,-4.11158 -1.40412,-6.22611l0,-3.75916l6.63764,0.82232c3.70177,0.46989 6.89294,1.05726 7.14823,1.29221zm16.8494,1.87958c0,1.99706 -0.63824,4.69895 -1.40412,5.99116c-2.29764,3.87664 0.38294,7.98823 5.23353,7.98823c2.04235,0 3.8294,0.46989 3.8294,1.17474c0,1.76211 -5.23352,3.87664 -9.31822,3.75916c-6.63764,-0.11748 -9.82881,-4.58148 -11.74352,-16.32886c-0.76588,-4.81643 -0.76588,-4.9339 3.44647,-5.4038c4.97822,-0.52863 7.46734,-0.79295 8.7119,-0.44052c1.24456,0.35242 1.24456,1.32158 1.24456,3.2599z"
            ></path>
            <ellipse
              transform="rotate(29.1185 37.4231 70.3451)"
              ry="3.22179"
              rx="5.1936"
              cy="70.3451"
              cx="37.42314"
            ></ellipse>
            <ellipse
              transform="rotate(-27.7941 88.5682 70.4978)"
              ry="3.22179"
              rx="5.1936"
              cy="70.49777"
              cx="88.56817"
            ></ellipse>
          </svg>
        </div>
        <div>
          <p class="font-medium text-lg text-blueGray-700">Loading ...</p>
          <p class="font-ligth text-blueGray-600">
            Fishing in progress. Please wait.
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

// Sort items
const sortItems = computed(() =>
  props.data ? props.data.sort((a, b) => a.number - b.number) : []
);

// Filters
const filters = ref({
  search: '',
  months: null,
});

// Filter sorted items
const filterItems = computed(() => {
  const { search, months } = filters.value;
  let items = sortItems.value;
  if (search != '') {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (months && months.values[0]?.id && months.values[1]?.id) {
    items = items.filter((item) => {
      return months
        .getMonthRange()
        .map((i) =>
          [...(months.isSouth ? item.south : item.north).months_array].includes(
            i
          )
        )
        .includes(true);
    });
    items.forEach((item) => (item.isSouth = months.isSouth ?? false));
  }
  return items;
});
</script>

<style></style>
