<template>
  <div class="flex flex-col">
    <filter-search
      class="bg-white"
      v-if="!noFilter"
      v-model:filters="filters"
      placeholder="Research an insect ..."
    />
    <!-- {{ filters }} -->
    <div
      v-if="!pending"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
    >
      <div
        v-for="item in filterItems"
        :key="item.number"
        class="bg-white flex flex-col rounded-md shadow-md p-2"
      >
        <!-- Bug Icon/Name -->
        <div class="flex flex-col items-center space-y-1">
          <img
            :src="item.image_url"
            class="w-12 h-12 object-cover border border-blueGray-200 bg-blueGray-200 rounded-full"
          />
          <p class="font-medium text-blueGray-800">{{ item.name }}</p>
        </div>

        <!-- Bug Prices -->
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
          <div class="inline-flex items-center justify-center px-2">
            <p class="text-blueGray-600 font-ligth mr-2">Flick</p>
            <p class="text-blueGray-800 font-medium text-lg">
              {{ item.sell_flick }}
            </p>
            <img src="~/assets/Bells.png" class="w-6 h-6" />
          </div>
        </div>

        <!-- Bug Catchphrases -->
        <data-table-catchphrases
          class="mt-2"
          :catchphrases="item.catchphrases"
        />

        <!-- Bug spawn months -->
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
              d="m19.72728,21.2276c-8.55058,4.82257 -12.62229,18.86475 -9.90782,33.19062c1.76441,9.21962 6.78617,18.72291 11.12933,21.55972c1.76441,1.13472 2.17158,2.97865 1.90013,7.65937c-0.67862,8.65225 2.57875,14.4677 10.17926,18.01371c10.04354,4.53889 21.58004,0.56736 27.55187,-9.64514c3.25736,-5.38993 7.46479,-6.38281 8.82203,-2.1276c1.22151,4.39705 9.63637,11.20538 15.6082,12.90746c6.9219,1.98576 15.33675,-0.28368 19.67991,-5.10625c3.39309,-3.82969 5.42894,-11.91458 4.0717,-16.31163c-0.67862,-2.1276 0.54289,-4.39705 4.47888,-8.93594c6.78617,-7.65937 9.09347,-14.4677 8.95775,-27.09149c0,-16.87899 -8.14341,-27.51701 -19.81563,-25.81492c-5.70039,0.85104 -19.40846,9.36146 -22.80155,14.32586c-1.08579,1.56024 -3.66453,4.82257 -5.70039,7.23385l-3.80026,4.25521l2.17158,-6.80833c1.62868,-4.96441 1.76441,-7.37569 0.67862,-8.51041c-1.08579,-1.13472 -2.03585,0 -3.52881,4.11337c-1.22151,2.97865 -2.57875,6.80833 -3.25736,8.22673c-0.81434,2.26944 -1.49296,1.4184 -3.66453,-4.68073c-3.52881,-10.35434 -7.05762,-9.21962 -4.0717,1.27656c0.81434,2.8368 -0.54289,1.84392 -6.379,-4.39705c-7.87196,-8.51041 -19.54418,-15.46059 -25.24457,-15.46059c-2.03585,0.14184 -5.15749,0.99288 -7.05762,2.1276zm28.36621,18.72291c4.88605,5.10625 9.36492,11.20538 10.04354,13.47482c1.35723,4.11337 3.80026,5.38993 3.80026,2.1276c0,-0.99288 0.95006,-3.12049 2.03585,-4.68073c1.90013,-2.55312 2.03585,-2.55312 3.66453,1.84392c2.03585,5.53177 2.85019,5.81545 4.88605,1.27656c0.81434,-1.98576 5.56466,-8.08489 10.72216,-13.61666l9.09347,-10.2125l6.10756,0.85104c3.39309,0.42552 8.6863,2.26944 11.94367,3.82969l5.83611,2.97865l0,8.65225c-0.13572,13.33298 -3.93598,20.70868 -14.38669,27.37517c-2.03585,1.4184 -2.3073,1.98576 -0.81434,3.54601c0.81434,0.99288 1.62868,4.25521 1.62868,7.23385c0,7.51753 -4.75032,12.48194 -11.94367,12.48194c-7.87196,0 -13.70807,-4.82257 -17.37261,-14.18402c-1.62868,-4.25521 -3.52881,-7.94305 -4.34315,-8.22673c-0.81434,-0.28368 -1.08579,-3.40417 -0.67862,-8.22673c0.81434,-7.51753 0.67862,-7.65937 -2.85019,-7.65937c-3.12164,0 -3.52881,0.56736 -3.52881,4.53889c0,6.80833 1.35723,11.06354 3.52881,11.06354c2.17158,0 2.57875,6.52465 0.40717,7.80121c-0.81434,0.56736 -1.76441,-0.28368 -2.17158,-1.98576c-1.08579,-4.53889 -2.44302,-3.68785 -6.24328,4.53889c-4.0717,8.51041 -9.2292,12.3401 -16.55827,12.3401c-6.78617,0 -9.63637,-1.98576 -11.5365,-7.65937c-1.22151,-3.82969 -1.08579,-5.95729 0.54289,-10.07066c2.03585,-4.96441 2.03585,-5.10625 -0.95006,-6.24097c-8.95775,-3.54601 -16.55827,-21.27604 -13.70807,-31.63037c1.08579,-3.97153 2.57875,-5.24809 8.6863,-7.80121c12.21511,-5.24809 14.25097,-4.68073 24.15878,6.24097z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="font-medium text-lg text-blueGray-700">Loading ...</p>
          <p class="font-ligth text-blueGray-600">
            Catching insects in progress. Please wait.
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
  return items;
});
</script>

<style></style>
