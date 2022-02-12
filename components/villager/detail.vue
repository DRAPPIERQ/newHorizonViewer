<template>
  <div class="flex flex-col">
    <div
      v-if="!pending && item"
      class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4"
    >
      <div class="bg-white flex flex-col rounded-md shadow-md md:col-span-2">
        <!-- Villager Icon -->
        <div
          class="flex flex-col items-center justify-center w-full pb-2 border shadow-md-b"
          :style="{
            backgroundColor: item.background_color,
          }"
        >
          <div class="flex flex-row-reverse w-full p-2">
            <a
              class="inline-flex items-center text-white text-opacity-75 hover:text-opacity-100 animate"
              :href="item.url"
              target="_blank"
            >
              <p class="animate-fade-r px-1">Wiki</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </a>
          </div>
          <img
            v-if="item?.nh_details?.icon_url"
            :src="item.nh_details.icon_url"
            class="xl:w-18 w-12 xl:h-18 h-12 object-cover border rounded-full"
            :style="{
              borderColor: item.border_color,
              backgroundColor: item.background_color,
            }"
          />
          <!-- Villager name, gender and personality -->
          <div
            class="flex flex-col items-center justify-center w-full bg-white mt-2"
          >
            <div class="inline-flex">
              <p
                class="font-medium px-1"
                :style="{
                  color: item.text_color,
                }"
              >
                {{ item.name }}
              </p>
              <svg
                v-if="item.gender === 'Male'"
                xmlns="http://www.w3.org/2000/svg"
                class="text-blue-500 h-auto w-5 px-1"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path
                  d="M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c0-6.6-5.4-12-12-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                ></path>
              </svg>
              <svg
                v-if="item.gender === 'Female'"
                xmlns="http://www.w3.org/2000/svg"
                class="text-pink-500 h-auto w-5 px-1"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path
                  d="M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z"
                ></path>
              </svg>
            </div>
            <div
              class="inline-flex border-t border-blueGray-800 text-blueGray-800"
            >
              <p class="text-xs currentColor">
                {{ item.personality }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-1 p-2 justify-center">
          <!-- Villager birthday -->

          <div class="inline-flex items-center justify-center">
            <div
              class="inline-flex items-center justify-center text-sm text-blueGray-600 border border-blueGray-400 rounded-full px-8 py-0.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                />
              </svg>
              <p class="font-medium currentColor">
                {{ item.birthday_day }} {{ item.birthday_month }}
              </p>
            </div>
          </div>
        </div>
        <!-- Villager quote -->
        <villager-quote class="mt-2 mx-2 justify-center" :quote="item.quote" />
        <!-- Villager hobbies -->
        <villager-hobby class="flex-1" :hobby="item.nh_details.hobby" />
        <!-- Villager favorite -->
        <villager-favorite
          :fav-styles="item.nh_details.fav_styles"
          :fav-colors="item.nh_details.fav_colors"
        />

        <div class="inline-flex items-center justify-center p-2 pb-4">
          <div
            @click="$router.push(`/villagers/${item.id}`)"
            class="text-blueGray-600 hover:text-blueGray-400 border border-blueGray-400 hover:border-blueGray-200 cursor-pointer rounded-full px-8 py-0.5"
          >
            More information
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
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
        </div>
        <div>
          <p class="font-medium text-lg text-blueGray-700">Loading ...</p>
          <p class="font-ligth text-blueGray-600">
            Searching in progress. Please wait.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  pending: {
    type: Boolean,
    default: true,
  },
});

// Colors methods
const { hexToRgba, rgbaToString } = useColors();
const getRgbaColorFromHex = (hex) => {
  let rgba = hexToRgba(hex);
  if (parseInt(rgba.r + rgba.g + rgba.b) > 725) {
    rgba = {
      ...rgba,
      r: parseInt((rgba.r / 255) * 220),
      g: parseInt((rgba.g / 255) * 220),
      b: parseInt((rgba.b / 255) * 220),
    };
  }
  return rgba;
};

const item = computed(() => {
  if (!props.pending && props.data) {
    const color_rgba = getRgbaColorFromHex(props.data.title_color);
    return {
      ...props.data,
      border_color: rgbaToString({
        r: color_rgba.r - 10,
        g: color_rgba.g - 10,
        b: color_rgba.b - 10,
        a: color_rgba.a - 0.6,
      }),
      background_color: rgbaToString({
        r: color_rgba.r - 10,
        g: color_rgba.g - 10,
        b: color_rgba.b - 10,
        a: color_rgba.a - 0.2,
      }),
      text_color: rgbaToString({
        r: color_rgba.r - 10,
        g: color_rgba.g - 10,
        b: color_rgba.b - 10,
        a: color_rgba.a - 0.2,
      }),
    };
  }
  return null;
});
</script>
