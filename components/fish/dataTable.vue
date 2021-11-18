<template>
  <div class="flex flex-col">
    <fish-data-filter v-if="!noFilter" />
    <div class="grid grid-cols-4 gap-4">
      <div v-for="item in items" :key="item.id" class="grid-item">
        <!-- {{ item }} -->
        <img :src="item.icon_uri" class="w-12 h-12 object-cover" />
      </div>
    </div>
    <p class="text-gray-700 text-xl font-bold">Aucun résultat</p>
    <layout-paginate-footer v-if="!noPaginate" />
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
    const { pending, error, data } = await useFetch(
      "https://acnhapi.com/v1/fish"
    );

    return {
      pending,
      error,
      items: data,
    };
  },
  mounted() {
    console.log(this.pending);
    console.log(this.error);
    console.log(this.items);
  },
});
</script>

<style>
.grid-item {
  @apply flex flex-col rounded-md shadow-md;
}
</style>
