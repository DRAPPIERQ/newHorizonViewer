<template>
  <div class="flex flex-col space-y-2">
    <p>{{ label }}</p>
    <div v-if="hemisphere" class="flex flex-row items-center">
      <p class="font-medium">Hemisphere</p>
      <select
        class="ml-2 h-5 border border-blueGray-800 rounded"
        @change="updateHemisphere"
      >
        <option value="north" selected>North</option>
        <option value="south">South</option>
      </select>
    </div>
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
    <div class="flex flex-row items-center">
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

<script setup>
// Props
const props = defineProps({
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
  hemisphere: {
    type: Boolean,
    default: false,
  },
});
// Emits
const emit = defineEmits([
  "change:selectedOption",
  "change:selectedHemisphere",
]);

const selectedOption = ref({
  from: { ...props.options[0] },
  to: { ...props.options2[0] },
});
emit("change:selectedOption", selectedOption.value);
emit("change:selectedHemisphere", "north");

const updateFrom = ({ target }) => {
  selectedOption.value.from = props.options[target.value]; // new Proxy({}, {});
  emit("change:selectedOption", selectedOption.value);
};
const updateTo = ({ target }) => {
  selectedOption.value.to = props.options2[target.value]; // new Proxy({}, {});
  emit("change:selectedOption", selectedOption.value);
};
const updateHemisphere = ({ target }) => {
  emit("change:selectedHemisphere", target.value);
};
</script>

<style></style>
