<template>
  <div class="flex flex-col">
    <data-table-filter
      class="bg-white"
      v-if="!noFilter"
      v-model:filters="filters"
      :more-options="moreFilter"
    />
    {{ filters }}
    {{ moreFilter }}
    <div
      v-if="!pending"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
    >
      <!-- v-for="item in [sortItems(items)[11]]" -->
      <div
        v-for="item in sortItems"
        :key="item.number"
        class="bg-white flex flex-col rounded-md shadow-md p-2"
      >
        <!-- Fish Icon/Name -->
        <div class="flex flex-col items-center space-y-1">
          <img
            :src="item.image_url"
            class="
              w-12
              h-12
              object-cover
              border border-blueGray-200
              bg-blueGray-200
              rounded-full
            "
          />
          <p class="font-medium text-blueGray-800">{{ item.name }}</p>
        </div>

        <!-- Fish Catchphrases -->
        <fish-catchphrases class="mt-2" :catchphrases="item.catchphrases" />

        <!-- Fish spawn months -->
        <div
          class="
            flex flex-col
            align-center
            justify-center
            mt-2
            rounded-lg
            shadow
          "
        >
          <div class="grid grid-cols-2">
            <div
              class="
                flex flex-row
                w-full
                align-center
                justify-center
                p-1
                rounded-tr rounded-tl
                cursor-pointer
                select-none
              "
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
              class="
                flex flex-row
                w-full
                align-center
                justify-center
                p-1
                rounded-tr rounded-tl
                cursor-pointer
                select-none
              "
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
            class="
              flex flex-col
              border-b border-l
              rounded-bl-lg
              border-r
              rounded-br-lg
              p-2
            "
          >
            <fish-spawn-months
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
    <div v-else>Loading...</div>
    <layout-paginate-footer class="bg-white" v-if="!noPaginate" />
  </div>
</template>

<script>
export default defineComponent({
  name: "Fish DataTable",
  props: {
    noFilter: {
      type: Boolean,
      default: false,
    },
    noPaginate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // Fetch data
    const { GET, AcnhOptions } = useApiEnv();
    const { pending, error, data } = useFetch("nh/fish", {
      method: GET,
      baseURL: AcnhOptions.baseURL,
      headers: AcnhOptions.headers,
    });
    // Filters
    const filters = ref({
      search: "",
      more: [],
    });
    const monthRange = useFilterMonthRange();
    const moreFilter = ref([monthRange]);
    return {
      pending,
      error,
      items: data,
      sortItems: computed(() => data.value.sort((a, b) => a.number - b.number)),
      filters,
      moreFilter,
    };
  },
});
</script>

<style></style>
