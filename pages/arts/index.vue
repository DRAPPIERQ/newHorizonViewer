<template>
  <NuxtLayout name="default">
    <div class="bg-gray-100">
      <art-data-table :data="arts" :pending="pending" />
    </div>
  </NuxtLayout>
</template>

<script setup>
// Define page name
const pageTitle = useTitle('Arts | ACNH Database');

// Fetch data
const { GET, AcnhOptions } = useApiEnv();
const { pending, error, data } = useFetch('nh/art', {
  method: GET,
  baseURL: AcnhOptions.baseURL,
  headers: AcnhOptions.headers,
});
// Return data or empty array
const arts = computed(() => (data.value ? data.value : []));
</script>

<style></style>
