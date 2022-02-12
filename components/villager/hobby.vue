<template>
  <div class="flex flex-col space-y-1 p-2 justify-start space-y-2 pb-4">
    <div
      class="flex flex-row font-medium items-center border-b border-blueGray-800 text-blueGray-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-2"
        fill="currentColor"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
        ></path>
      </svg>
      <p class="currentColor">Hobby {{ ' | ' + hobby ?? '' }}</p>
    </div>
    <div class="flex flex-col items-center align-center text-blueGray-800">
      <p v-if="hobby.toLowerCase() == 'education'" class="currentColor">
        Villagers will inspect artwork, bugs, fossils, flowers, and trees with a
        magnifying glass. They will often be seen wearing rimmed glasses while
        reading a novel.
      </p>
      <p v-else-if="hobby.toLowerCase() == 'fashion'" class="currentColor">
        Villagers will often be seen wandering with a pink bag with an Oxeye
        Daisy on it and wear certain accessories, even if they have not been
        gifted any by the player.
      </p>
      <p v-else-if="hobby.toLowerCase() == 'fitness'" class="currentColor">
        Villagers can lift heavy dumbbells anywhere, while other villagers will
        only do so in the plaza.
      </p>
      <p v-else-if="hobby.toLowerCase() == 'music'" class="currentColor">
        Villagers can sing and dance anywhere on the island, even if there is no
        music playing.
      </p>
      <p v-else-if="hobby.toLowerCase() == 'nature'" class="currentColor">
        Villagers will examine flowers while reading a book about flowers,
        examine trees or bugs while reading a book about bugs, or examine placed
        fossils while reading a book about fossils. They can water multiple
        flowers at once, while other villagers will only water one flower at a
        time.
      </p>
      <p v-else-if="hobby.toLowerCase() == 'play'" class="currentColor">
        Villagers will run around the island or their own house in their spare
        time, while other villagers will only run around in the plaza.
      </p>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  hobby: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
