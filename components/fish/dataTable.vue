<template>
  <div class="flex flex-col">
    <data-table-filter
      class="bg-white"
      v-if="!noFilter"
      v-model:filters="filters"
      placeholder="Research a fish ..."
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
        <!-- Fish Icon/Name -->
        <div class="flex flex-col items-center space-y-1">
          <img
            :src="item.image_url"
            class="w-12 h-12 object-cover border border-blueGray-200 bg-blueGray-200 rounded-full"
          />
          <p class="font-medium text-blueGray-800">{{ item.name }}</p>
        </div>

        <!-- Fish Prices -->
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
            <p class="text-blueGray-600 font-ligth mr-2">CJ</p>
            <p class="text-blueGray-800 font-medium text-lg">
              {{ item.sell_cj }}
            </p>
            <img src="~/assets/Bells.png" class="w-6 h-6" />
          </div>
        </div>

        <!-- Fish Catchphrases -->
        <data-table-catchphrases
          class="mt-2"
          :catchphrases="item.catchphrases"
        />

        <!-- Fish spawn months -->
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
                  ? item.times_by_month_north
                  : item.times_by_month_south
              "
              :spawns-availability="
                !item?.isSouth
                  ? item.n_availability_array
                  : item.s_availability_array
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
              d="m76.60658,19.32633c-2.89074,2.10907 -6.43847,5.14087 -7.75245,6.72267c-1.97096,2.24089 -4.07332,2.76816 -9.8548,2.76816c-12.61415,0.13182 -21.15498,5.4045 -33.76913,21.35438c-3.94192,4.87723 -8.01524,8.96357 -9.06642,8.96357c-3.81052,0 -5.91288,3.95451 -5.1245,9.62265c1.44537,9.49083 11.03738,22.01346 24.57131,32.03156c9.19782,6.85449 19.05262,9.49083 27.85625,7.51358c5.1245,-1.18635 6.17568,-1.05454 8.01524,1.05454c5.2559,5.79995 14.32232,-0.13182 22.73175,-14.89534c3.67913,-6.32722 3.94192,-6.45904 5.38729,-3.8227c1.97096,3.8227 7.22686,5.79995 10.64319,4.08633c3.67913,-2.10907 4.33611,-6.85449 1.97096,-15.02715c-1.97096,-6.45904 -1.97096,-7.77721 -0.26279,-11.07264c1.05118,-1.97726 2.23376,-5.79995 2.75935,-8.4363c0.78838,-3.8227 0.39419,-5.27269 -1.97096,-7.64539c-1.83956,-1.84544 -3.81052,-2.63634 -5.78149,-2.10907c-2.62795,0.65909 -3.02214,-0.13182 -5.1245,-8.17266c-1.31397,-4.87723 -4.20472,-12.65445 -6.56987,-17.39986c-3.94192,-7.90903 -4.59891,-8.56811 -8.80363,-8.96357c-3.54773,-0.26363 -6.04428,0.52727 -9.8548,3.42725zm13.66533,9.49083c2.10236,4.48178 4.8617,11.99536 6.17568,16.74078l2.36515,8.69993l-3.15354,2.50453c-1.70817,1.31817 -3.81052,2.89998 -4.8617,3.42725c-1.44537,0.92272 -1.44537,1.71362 0.39419,5.27269c1.05118,2.37271 2.49655,4.21815 3.15354,4.21815c0.52559,0 3.54773,-2.89998 6.56987,-6.59086c3.02214,-3.69088 6.04428,-6.59086 6.70127,-6.59086c1.83956,0 1.31397,4.21815 -1.31397,10.14992c-2.36515,5.00905 -2.36515,5.93177 -0.52559,12.12718c2.75935,9.75447 1.83956,12.65445 -2.23376,6.45904c-5.51869,-8.30448 -13.79673,-9.88629 -12.35136,-2.37271c0.78838,3.95451 -0.91978,7.38176 -8.40943,16.87259c-4.9931,6.32722 -6.17568,6.72267 -9.32922,2.76816c-2.10236,-2.63634 -2.62795,-2.76816 -7.35825,-1.18635c-9.46061,3.16361 -24.17712,-1.05454 -31.27258,-8.83175c-2.23376,-2.50453 -2.10236,-2.63634 3.15354,-5.14087c3.02214,-1.31817 7.75245,-4.08633 10.51179,-6.06359c4.9931,-3.55906 5.51869,-3.69088 23.38874,-3.69088c10.1176,0 18.65843,-0.52727 19.05262,-1.18635c1.05118,-1.58181 -9.72341,-4.21815 -13.27114,-3.29543c-1.44537,0.39545 -3.15354,0.13182 -3.54773,-0.65909c-1.18258,-1.84544 -6.43847,-1.84544 -8.27804,0c-0.91978,0.92272 -2.23376,1.05454 -3.81052,0.13182c-1.44537,-0.65909 -3.28493,-0.92272 -4.07332,-0.65909c-1.18258,0.39545 -1.70817,-1.18635 -1.70817,-5.93177c0,-10.14992 -1.44537,-18.71803 -3.28493,-18.71803c-1.18258,0 -1.31397,1.71362 -0.39419,6.85449c2.36515,15.02715 -1.57677,23.068 -14.19092,28.99977l-8.67223,4.08633l-2.75935,-3.03179c-1.57677,-1.71362 -2.10236,-2.63634 -1.18258,-2.10907c0.78838,0.52727 1.57677,0.39545 1.57677,-0.13182c0,-0.65909 -1.31397,-1.71362 -2.89074,-2.37271c-1.57677,-0.7909 -3.81052,-3.03179 -4.9931,-5.00905c-1.83956,-3.42725 -1.83956,-3.8227 0.52559,-5.66814c3.41633,-2.37271 4.73031,-2.37271 4.73031,0.26363c0,3.29543 7.35825,9.75447 11.16878,9.75447c4.33611,0 10.64319,-3.16361 11.69437,-5.93177c0.39419,-1.18635 0.78838,-4.48178 0.78838,-7.24994c0,-9.2272 -10.77459,-14.89534 -18.39564,-9.62265l-3.28493,2.24089l2.62795,-3.29543c13.27114,-16.47714 23.65153,-22.54073 33.63773,-19.64075c4.07332,1.18635 4.73031,1.05454 7.75245,-2.50453c3.81052,-4.6136 12.87694,-11.99536 14.71651,-11.99536c0.65699,0 2.89074,3.55906 4.8617,7.90903zm-47.56586,30.58158c3.94192,3.69088 3.94192,9.75447 0.1314,13.8408c-3.67913,3.95451 -8.27804,3.8227 -12.48275,-0.39545c-2.62795,-2.63634 -3.15354,-4.08633 -2.49655,-7.51358c1.57677,-8.17266 9.19782,-11.20446 14.84791,-5.93177z"
            ></path>
            <ellipse
              ry="7.07964"
              rx="6.72566"
              id="svg_5"
              cy="66.44244"
              cx="36.70794"
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
