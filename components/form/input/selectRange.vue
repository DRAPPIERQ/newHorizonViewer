<template>
  <div class="flex flex-col">
    <p>{{ label }}</p>
    <div class="flex flex-row items-center">
      <p class="font-medium">
        {{ optionLabel }}
      </p>
      <select
        class="ml-2 h-5 border border-blueGray-800 rounded"
        @change="updateFrom"
      >
        <option
          v-for="(option, index) in options"
          :key="option.id"
          :value="index"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="flex flex-row items-center mt-2">
      <p class="font-medium">
        {{ option2Label }}
      </p>
      <select
        class="ml-2 h-5 border border-blueGray-800 rounded"
        @change="updateTo"
      >
        <option
          v-for="(option, index) in options2.length ? options2 : options"
          :key="option.id"
          :value="index"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    label: {
      type: String,
      default: "",
    },
    optionLabel: {
      type: String,
      default: "From",
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    option2Label: {
      type: String,
      default: "To",
    },
    options2: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const selectedOption = ref({
      from: props.options[0],
      to: props.options2[0],
    });
    emit("change:selectedOption", selectedOption.value);

    return {
      selectedOption,
      updateFrom: ({ target }) => {
        selectedOption.value.from = props.options[target.value];
        emit("change:selectedOption", selectedOption.value);
      },
      updateTo: ({ target }) => {
        selectedOption.value.to = props.options2[target.value];
        emit("change:selectedOption", selectedOption.value);
      },
    };
  },
});
</script>

<style></style>
