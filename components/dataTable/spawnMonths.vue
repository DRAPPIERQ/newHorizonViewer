<template>
  <div class="border rounded">
    <div
      v-for="(spawn, index) in spawns"
      :key="index"
      class="
        grid grid-cols-2
        first:rounded-tr first:rounded-tl
        last:rounded-br
        lats:rounded-bl
      "
      :class="
        spawnsAvailability.includes(index)
          ? index % 2
            ? 'bg-green-50'
            : 'bg-green-100'
          : index % 2
          ? 'bg-white'
          : 'bg-blueGray-50'
      "
    >
      <div>
        {{ getMonthName(index - 1) }}
      </div>
      <div class="inline-flex align-center justify-center">
        {{ spawnsAvailability.includes(index) ? spawn : "–" }}
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    spawns: {
      type: Object,
      default: () => [],
    },
    spawnsAvailability: {
      type: Object,
      default: () => [],
    },
  },
  setup() {
    return {
      getMonthName: (monthNb) =>
        new Date(0, monthNb).toLocaleString("en", { month: "long" }),
    };
  },
});
</script>

<style></style>
