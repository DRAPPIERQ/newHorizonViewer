<template>
  <NuxtLayout name="default">
    <div class="bg-gray-100">
      <bug-data-table :data="bugs" :pending="pending" />
    </div>
  </NuxtLayout>
</template>

<script setup>
// Define page name
const pageTitle = useTitle('Insects | ACNH Database');

// Fetch data
const { GET, AcnhOptions } = useApiEnv();
const { pending, error, data } = useFetch('nh/bugs', {
  method: GET,
  baseURL: AcnhOptions.baseURL,
  headers: AcnhOptions.headers,
});
// Return data or empty array
const bugs = computed(() => (data.value ? data.value : []));
</script>

<style></style>
