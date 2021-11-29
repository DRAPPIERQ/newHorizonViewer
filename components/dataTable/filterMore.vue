<template>
  <div class="flex flex-wrap items-center p-2 text-sm">
    <layout-slot-modal
      :showModal="isAddingFilter"
      @click:outside="closeFilterModal"
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
            :class="[
              optionSelected ? 'text-blueGray-800' : 'text-blueGray-400',
              optionSelected?.icon ? 'pl-8' : 'pl-2',
            ]"
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
          <div class="p-2" ref="optionSelectedRef"></div>
        </div>

        <div v-if="optionSelected" class="w-full border-b my-3"></div>

        <div v-if="optionSelected">
          <form-input-select-range
            v-if="optionSelected.slug.split('-').includes('range')"
            :options="optionSelected.range"
            :options2="
              optionSelected.range2
                ? optionSelected.range2
                : optionSelected.range
            "
            @change:selectedOption="updateSelected"
          />
        </div>
      </div>
    </layout-slot-modal>
    <div
      class="
        inline-flex
        items-center
        border border-blueGray-600
        rounded-full
        px-2
        cursor-pointer
      "
      v-for="(moreFilter, index) in moreFilters"
      :key="index"
    >
      {{ moreFilter }}
      <p v-if="index.split('-').includes('range') && !moreFilter.cumulative">
        {{ moreFilter.value.from.label }} - {{ moreFilter.value.to.label }}
      </p>
    </div>
    <div
      class="
        inline-flex
        items-center
        border border-blueGray-600
        rounded-full
        px-2
        cursor-pointer
      "
      @click="openFilterModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-blueGray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <p class="text-blueGray-600 ml-1">Add a filter</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, createApp } from "vue";

export default defineComponent({
  name: "DataTable MoreFilters",
  model: {
    prop: "moreFilters",
    event: "update:moreFilters",
  },
  props: {
    moreFilters: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    optionSelected: {
      immediate: true,
      handler(newOptionSelected) {
        if (this.$refs.optionSelectedRef) {
          if (newOptionSelected?.icon) {
            createApp({
              render: (h) => newOptionSelected.icon,
            }).mount(this.$refs.optionSelectedRef);
          } else {
            this.$refs.optionSelectedRef.innerHTML = "";
          }
        }
      },
    },
  },
  setup(props, { emit }) {
    const isAddingFilter = ref(false);
    const optionSelected = ref(null);
    const openFilterModal = () => {
      isAddingFilter.value = true;
      optionSelected.value = null;
    };
    const closeFilterModal = () => (isAddingFilter.value = false);

    return {
      optionSelected,
      selectOption: (event) => {
        optionSelected.value = props.options.filter(
          (opt) => opt.slug === event.target.value
        )[0];
      },
      isAddingFilter,
      openFilterModal,
      closeFilterModal,
      addMoreFilter: () => {
        let newFilters = { ...props.filters };
        if (optionSelected.value.cumulative) {
          newFilters[optionSelected.value.slug].values =
            newFilters[optionSelected.value.slug].values || [];
          newFilters[optionSelected.value.slug].values.push(
            optionSelected.value.values
          );
        } else {
          newFilters[optionSelected.value.slug].value =
            optionSelected.value.values;
        }
        newFilters[optionSelected.value.slug].cumulative =
          optionSelected.value.cumulative;
        newFilters[optionSelected.value.slug].icon = optionSelected.value.icon;
        emit("update:moreFilters", newFilters);
        closeFilterModal();
      },
      removeMoreFilter(filter) {
        delete this.filters[filter.slug];
      },
      updateSelected: (value) => {
        optionSelected.value.values = value;
      },
    };
  },
});
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
