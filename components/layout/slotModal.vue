<template>
  <div
    v-if="showModal"
    class="
      min-w-full
      h-screen
      animated
      fadeIn
      faster
      fixed
      left-0
      top-0
      flex
      justify-center
      items-center
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-blueGray-900 bg-opacity-25
    "
  >
    <div
      v-click-outside="clickOutside"
      class="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl"
      style="min-width: 24rem"
    >
      <slot />
      <div
        class="
          flex flex-row-reverse
          justify-between
          items-center
          space-x-reverse space-x-4
          p-2
        "
      >
        <button
          class="
            inline-flex
            items-center
            p-2
            rounded
            focus:outline-none focus:shadow-outline
            transition
            duration-150
            ease-in-out
          "
          :class="
            disableFinish
              ? 'bg-blueGray-300 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-400'
          "
          @click="finish"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p class="text-white font-medium ml-2">Apply filter</p>
        </button>

        <button
          class="
            p-2
            rounded
            bg-red-500
            hover:bg-red-400
            focus:outline-none focus:shadow-outline
            transition
            duration-150
            ease-in-out
          "
          @click="cancel"
        >
          <p class="text-white font-medium">Cancel</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  disableFinish: {
    type: Boolean,
    default: false,
  },
});
// Emits
const emit = defineEmits(["clickOutside", "finish", "cancel"]);
// watch showModal
watch(
  () => props.showModal,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        clickOutsideReady.value = true;
      }, 500);
    } else {
      clickOutsideReady.value = false;
    }
  }
);
// clickOutsideDirective
const vClickOutside = useClickOutside();
// clickOutsideReady
let clickOutsideReady = ref(false);

const clickOutside = () => {
  if (props.showModal && clickOutsideReady.value) {
    emit("clickOutside");
  }
};

const finish = () => {
  if (!props.disableFinish) {
    emit("finish");
  }
};

const cancel = () => {
  emit("cancel");
};
</script>

<style></style>
