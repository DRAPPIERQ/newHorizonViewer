<template>
  <NuxtLayout name="default">
    <div class="bg-gray-100">
      <fish-data-table :data="fishes" :pending="pending" />
    </div>
  </NuxtLayout>
</template>

<script setup>
// Define page name
const pageTitle = useTitle('Fishes | ACNH Database');

// Fetch data
const { GET, AcnhOptions } = useApiEnv();
const { pending, error, data } = useFetch('nh/fish', {
  method: GET,
  baseURL: AcnhOptions.baseURL,
  headers: AcnhOptions.headers,
});
// Return data or empty array
const fishes = computed(() => (data.value ? data.value : []));
</script>

<style></style>
