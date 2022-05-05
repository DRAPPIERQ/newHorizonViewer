<template>
  <NuxtLayout name="default">
    <div class="bg-gray-100">
      <villager-detail :data="villager" :pending="pending" fav-display="list" />
    </div>
  </NuxtLayout>
</template>

<script setup>
// Define page name
const pageTitle = useTitle('Villagers | ACNH Database');
// Route
const route = useRoute();
// Fetch data
const { GET, AcnhOptions } = useApiEnv();
const { pending, error, data } = useFetch('villagers?game=nh&nhdetails=true', {
  method: GET,
  baseURL: AcnhOptions.baseURL,
  headers: AcnhOptions.headers,
});
// Return data or empty array
const villager = computed(() =>
  data.value && route.params.id
    ? data.value.filter((e) => e.id == route.params.id)[0]
    : null
);
</script>
