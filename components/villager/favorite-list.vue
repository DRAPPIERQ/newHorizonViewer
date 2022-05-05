<template>
  <div class="flex flex-col space-y-1 p-2 justify-start space-y-2 pb-4">
    <div
      class="flex flex-row font-medium items-center border-b border-blueGray-800 text-blueGray-800 pb-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-auto mr-2"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path
          fill="currentColor"
          d="M638 121c-3.3-9.8-10.2-17.8-19.5-22.4L420.2 0c-9.5 13.2-28.4 50.3-100.2 50.3-72.4 0-91.1-37.7-100.2-50.3L21.6 98.6C12.3 103.2 5.3 111.2 2 121c-3.3 9.9-2.6 20.4 2.1 29.7l53 106.2c9.6 19.2 33 27 51.6 17.7l24-11.3c5.3-2.5 11.4 1.4 11.4 7.2v185.3c0 31 25.1 56.2 56 56.2h240c30.9 0 56-25.2 56-56.2V270.6c0-5.9 6.1-9.7 11.4-7.2l23.5 11.1c19.1 9.7 42.5 1.8 52.1-17.4l53-106.2c4.4-9.5 5.2-20 1.9-29.9zm-94 106.4l-73.2-34.6c-10.6-5-22.8 2.7-22.8 14.5v248.6c0 4.4-3.6 8-8 8H200c-4.4 0-8-3.6-8-8V207.3c0-11.7-12.2-19.5-22.8-14.5L96 227.4l-44.8-89.9 155.5-77.3c26.4 24 67.8 38.3 113.3 38.3s86.9-14.3 113.2-38.2l155.5 77.3-44.7 89.8z"
          class=""
        ></path>
      </svg>
      <p class="currentColor">Favorite cloth</p>
      <div class="flex flex-row-reverse flex-1 text-blueGray-800">
        <select
          v-model="selectStyle"
          class="mx-1 px-2 border rounded-full white"
          :disabled="pending"
        >
          <option
            v-for="(style, index) in favStyles"
            :key="index"
            :value="index"
          >
            {{ style }}
          </option>
        </select>

        <select
          v-model="selectColor"
          class="mx-1 px-2 border rounded-full"
          :class="favColors[selectColor].toLowerCase()"
          :disabled="pending"
        >
          <option
            v-for="(color, index) in favColors"
            :key="index"
            :value="index"
          >
            {{ color }}
          </option>
        </select>
      </div>
    </div>
    <cloth-horizontal-list
      :clothes="favClothes"
      :pending="pending"
      :color="selectColorLabel"
    />
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  favStyles: {
    type: Array,
    default: () => [],
  },
  favColors: {
    type: Array,
    default: () => [],
  },
});

// Fetch options
const { GET, AcnhOptions } = useApiEnv();

// Data
const selectStyle = ref(0);
const selectStyleLabel = computed(() => props.favStyles[selectStyle.value]);
const selectColor = ref(0);
const selectColorLabel = computed(() => props.favColors[selectColor.value]);
// Fetch data
const { pending, error, data } = useFetch(
  'nh/clothing?color=' +
    props.favColors[selectColor.value] +
    '&style=' +
    props.favStyles[selectStyle.value],
  {
    method: GET,
    baseURL: AcnhOptions.baseURL,
    headers: AcnhOptions.headers,
  }
);
const favClothes = computed(() => data.value);

watch(
  () => [selectColor.value, selectStyle.value],
  (newValue) => {
    pending.value = true;
    useFetch(
      'nh/clothing?color=' +
        props.favColors[newValue[0]] +
        '&style=' +
        props.favStyles[newValue[1]],
      {
        method: GET,
        baseURL: AcnhOptions.baseURL,
        headers: AcnhOptions.headers,
      }
    )
      .then((obj) => {
        data.value = obj.data.value;
      })
      .finally(() => {
        pending.value = false;
      });
  }
);
</script>

<style>
.black {
  background-color: rgba(53, 51, 39, 0.8);
  border-color: rgba(53, 51, 39, 1);
  @apply text-white;
}
.gray {
  background-color: rgba(146, 145, 143, 0.8);
  border-color: rgba(146, 145, 143, 1);
  @apply text-white;
}
.white {
  background-color: rgba(232, 234, 246, 0.8);
  border-color: rgba(232, 234, 246, 1);
}
.beige {
  background-color: rgba(208, 200, 185, 0.8);
  border-color: rgba(208, 200, 185, 1);
}

.purple {
  background-color: rgba(210, 115, 188, 0.8);
  border-color: rgba(210, 115, 188, 1);
  @apply text-white;
}
.blue {
  background-color: rgba(55, 140, 222, 0.8);
  border-color: rgba(55, 140, 222, 1);
  @apply text-white;
}
.aqua {
  background-color: rgba(85, 203, 181, 0.8);
  border-color: rgba(85, 203, 181, 1);
  @apply text-white;
}
.green {
  background-color: rgba(57, 150, 80, 0.8);
  border-color: rgba(57, 150, 80, 1);
  @apply text-white;
}
.brown {
  background-color: rgba(124, 66, 64, 0.8);
  border-color: rgba(124, 66, 64, 1);
  @apply text-white;
}
.red {
  background-color: rgba(244, 78, 78, 0.8);
  border-color: rgba(244, 78, 78, 1);
  @apply text-white;
}
.orange {
  background-color: rgba(255, 134, 76, 0.8);
  border-color: rgba(255, 134, 76, 1);
  @apply text-white;
}
.yellow {
  background-color: rgba(240, 206, 50, 0.8);
  border-color: rgba(240, 206, 50, 1);
  @apply text-white;
}
.pink {
  background-color: rgba(255, 160, 176, 0.8);
  border-color: rgba(255, 160, 176, 1);
  @apply text-white;
}
.colorful {
  background-color: rgba(255, 160, 176, 0.8);
  border-color: rgba(255, 160, 176, 1);
  @apply text-white;
  animation: color-me-in 10s infinite;
}
@keyframes color-me-in {
  0% {
    background-color: rgba(210, 115, 188, 0.8);
    border-color: rgba(210, 115, 188, 1);
  }
  10% {
    background-color: rgba(55, 140, 222, 0.8);
    border-color: rgba(55, 140, 222, 1);
  }
  20% {
    background-color: rgba(85, 203, 181, 0.8);
    border-color: rgba(85, 203, 181, 1);
  }
  30% {
    background-color: rgba(57, 150, 80, 0.8);
    border-color: rgba(57, 150, 80, 1);
  }
  40% {
    background-color: rgba(124, 66, 64, 0.8);
    border-color: rgba(124, 66, 64, 1);
  }
  50% {
    background-color: rgba(244, 78, 78, 0.8);
    border-color: rgba(244, 78, 78, 1);
  }
  60% {
    background-color: rgba(255, 134, 76, 0.8);
    border-color: rgba(255, 134, 76, 1);
  }
  70% {
    background-color: rgba(240, 206, 50, 0.8);
    border-color: rgba(240, 206, 50, 1);
  }
  90% {
    background-color: rgba(255, 160, 176, 0.8);
    border-color: rgba(255, 160, 176, 1);
  }
  100% {
    background-color: rgba(210, 115, 188, 0.8);
    border-color: rgba(210, 115, 188, 1);
  }
}
</style>
