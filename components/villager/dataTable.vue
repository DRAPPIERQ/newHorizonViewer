<template>
  <div class="flex flex-col">
    <data-table-filter
      class="bg-white"
      v-if="!noFilter"
      v-model:filters="filters"
      placeholder="Research a villager ..."
    />
    <!-- {{ filters }} -->
    <div
      v-if="!pending"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"
    >
      <div
        v-for="item in filterItems"
        :key="item.id"
        class="bg-white flex flex-col rounded-md shadow-md"
      >
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
          <!-- Villager name and gender -->
          <div
            class="flex flex-row items-center justify-center w-full bg-white mt-2"
          >
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
        </div>
        <div class="flex flex-col space-y-1 p-2 justify-center">
          <!-- Villager birthday -->
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
          <!-- Villager quote -->
          <data-table-catchphrases
            class="mt-4 justify-center"
            :catchphrases="[item.quote]"
          />
        </div>
        <div class="flex flex-col space-y-1 p-2 justify-center space-y-2 pb-4">
          <div
            class="flex flex-row font-medium items-center border-b border-blueGray-800 text-blueGray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              fill="currentColor"
              viewBox="0 0 980 908"
            >
              <g transform="translate(0,908) scale(0.1,-0.1)" stroke="none">
                <path
                  d="M3410 9064 c-128 -17 -369 -59 -715 -124 -143 -27 -296 -54 -340 -60 -96 -13 -172 -46 -293 -129 -183 -126 -207 -152 -406 -440 -409 -593 -1570 -2314 -1621 -2404 l-30 -52 0 -210 c0 -176 3 -220 18 -270 36 -116 92 -188 206 -264 200 -134 874 -525 1258 -730 187 -100 210 -110 289 -130 l41 -11 7 -1677 c3 -923 11 -1779 15 -1902 l9 -224 36 -71 c64 -129 174 -239 304 -303 l74 -37 246 -9 c330 -12 4436 -12 4762 0 l255 10 65 32 c132 66 250 182 312 308 28 58 31 73 40 225 5 90 12 944 16 1898 4 954 11 1740 15 1746 3 6 25 14 48 18 128 21 1499 804 1619 926 99 101 146 222 157 410 9 170 -4 225 -94 377 -119 199 -788 1194 -1587 2357 -157 229 -178 255 -259 322 -127 107 -232 175 -301 195 -142 42 -686 145 -1055 199 -282 42 -401 40 -536 -9 -271 -99 -373 -112 -969 -118 -678 -7 -849 8 -1118 98 -215 72 -274 79 -468 53z m390 -639 c280 -94 666 -145 1105 -145 445 0 811 49 1083 146 69 24 129 44 135 44 15 0 2 -102 -28 -205 -77 -270 -271 -531 -517 -695 -227 -152 -396 -200 -699 -200 -230 0 -360 30 -547 125 -295 151 -515 400 -625 711 -41 113 -68 264 -49 264 4 0 68 -20 142 -45z m-507 -39 c8 -8 27 -66 42 -128 64 -263 171 -473 347 -684 157 -186 348 -328 588 -435 201 -90 368 -115 720 -106 178 4 229 9 299 27 268 71 521 218 726 424 225 226 342 433 430 757 20 74 42 140 50 148 11 12 47 6 237 -39 417 -98 592 -154 756 -242 79 -43 86 -49 151 -144 1038 -1507 1390 -2024 1440 -2119 55 -102 38 -230 -41 -319 -60 -70 -498 -331 -838 -501 l-134 -67 -71 4 c-148 10 -175 38 -420 433 -65 105 -141 226 -169 270 l-51 80 -7 -45 c-4 -25 -10 -1064 -14 -2310 -3 -1246 -9 -2337 -13 -2426 -10 -183 -15 -199 -91 -267 -43 -38 -60 -47 -108 -54 -31 -4 -1045 -8 -2252 -8 -1783 0 -2203 2 -2238 13 -52 16 -123 78 -148 130 -29 61 -33 326 -33 2217 -1 1800 -8 2745 -22 2745 -4 0 -69 -100 -145 -222 -223 -361 -298 -471 -340 -500 -61 -42 -108 -58 -174 -58 -56 0 -72 6 -213 78 -302 156 -710 393 -785 457 -60 52 -92 121 -99 209 -5 65 -3 77 25 132 37 74 220 347 747 1114 640 933 733 1063 809 1125 58 48 185 110 293 145 132 42 668 176 720 179 6 1 18 -6 26 -13z"
                />
              </g>
              <p class="currentColor">Favorite cloth</p>
            </svg>
          </div>
          <div class="flex flex-wrap items-center text-blueGray-800">
            <p class="currentColor">styles :</p>
            <div
              class="mx-1 px-2 border rounded-full white"
              v-for="(fav_style, key) in item.nh_details.fav_styles"
              :key="key"
            >
              {{ fav_style }}
            </div>
          </div>
          <div class="flex flex-wrap items-center text-blueGray-800">
            <p class="currentColor">colors :</p>
            <div
              class="mx-1 px-2 border rounded-full"
              :class="fav_color.toLowerCase()"
              v-for="(fav_color, key) in item.nh_details.fav_colors"
              :key="key"
            >
              {{ fav_color }}
            </div>
          </div>
        </div>

        <!-- {{ item }} -->
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
  return items
    .filter((item) => item.nh_details)
    .map((item) => {
      const color_rgba = getRgbaColorFromHex(item.title_color);

      return {
        ...item,
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
    });
});
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
