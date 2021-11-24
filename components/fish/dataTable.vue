<template>
  <div class="flex flex-col">
    <fish-data-filter class="bg-white" v-if="!noFilter" />
    <div class="grid grid-cols-2 gap-4 my-4">
      <div
        v-for="item in [sortItems(items)[0]]"
        :key="item.number"
        class="bg-white grid-item px-2 py-2"
      >
        <div class="flex flex-row align-center justify-center">
          <img
            :src="item.image_url"
            class="w-12 h-12 object-cover border border-gray-100 rounded-full"
          />
        </div>
        <div class="flex flex-row align-center justify-center mt-2">
          <div
            v-for="(catchphrase, index) in item.catchphrases"
            :key="index"
            class="border-l-4 pl-2 border-gray-800 font-ligth italic"
          >
            "{{ catchphrase }}"
          </div>
        </div>
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
                  : 'bg-gray-100 border-b',
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
                  : 'bg-gray-100 border-b',
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
              h-20
            "
          >
            <!-- {{ item }} -->
          </div>
        </div>
      </div>
    </div>
    <!-- <p class="text-gray-700 text-xl font-bold">Aucun résultat</p> -->
    <layout-paginate-footer class="bg-white" v-if="!noPaginate" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

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
  async setup(props) {
    const { GET, AcnhOptions } = useApiEnv();
    const { pending, error, data } = await useFetch("nh/fish", {
      method: GET,
      baseURL: AcnhOptions.baseURL,
      headers: AcnhOptions.headers,
    });

    return {
      pending,
      error,
      items: data,
    };
  },
  mounted() {
    console.log();
  },
  methods: {
    sortItems(items) {
      return items.sort((a, b) => a.number - b.number);
    },
  },
});
</script>

<style>
.grid-item {
  @apply flex flex-col rounded-md shadow-md;
}
</style>
