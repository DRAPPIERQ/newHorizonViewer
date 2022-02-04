<template>
  <div class="flex w-full h-screen">
    <layout-sidebar class="w-44 h-full" />
    <div
      id="body"
      class="relative flex-1 bg-blueGray-100 p-6 overflow-y-scroll"
    >
      <slot class="bg-blueGray-50" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style>
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: blueGrayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.animate-loading {
  @apply bg-blueGray-50 border-2 border-blueGray-600 rounded-full;
  animation: loading 1.4s ease-out infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  60%,
  100% {
    transform: rotate(-360deg);
  }
}

.animate:hover .animate-fade-r {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  80%,
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  80%,
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.animate .animate-fade-r {
  -webkit-animation-name: fadeOutRight;
  animation-name: fadeOutRight;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeOutRight {
  0% {
    opacity: 1;
  }
  80%,
  100% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}
@keyframes fadeOutRight {
  0% {
    opacity: 1;
  }
  80%,
  100% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}
</style>
