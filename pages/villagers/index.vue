<template>
  <NuxtLayout name="default">
    <div class="bg-gray-100">
      <villager-data-table :data="villagers" :pending="pending" />
    </div>
  </NuxtLayout>
</template>

<script setup>
// Define page name
const pageTitle = useTitle('Villagers | ACNH Database');

// Fetch data
const { GET, AcnhOptions } = useApiEnv();
const { pending, error, data } = useFetch('villagers?game=nh&nhdetails=true', {
  method: GET,
  baseURL: AcnhOptions.baseURL,
  headers: AcnhOptions.headers,
});
// Return data or empty array
const villagers = computed(() => (data.value ? data.value : []));
</script>

<style></style>
