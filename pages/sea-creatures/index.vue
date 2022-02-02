<template>
  <NuxtLayout name="default">
    <div class="bg-gray-100">
      <sea-creature-data-table :data="seaCreatures" :pending="pending" />
    </div>
  </NuxtLayout>
</template>

<script setup>
// Define page name
const pageTitle = useTitle('Sea Creatures | ACNH Database');

// Fetch data
const { GET, AcnhOptions } = useApiEnv();
const { pending, error, data } = useFetch('nh/sea', {
  method: GET,
  baseURL: AcnhOptions.baseURL,
  headers: AcnhOptions.headers,
});
// Return data or empty array
const seaCreatures = computed(() => (data.value ? data.value : []));
</script>

<style></style>
