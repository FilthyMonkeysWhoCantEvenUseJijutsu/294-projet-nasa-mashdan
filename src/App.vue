<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
  import { useAnomalyStore } from '@/stores/anomalyStore'

  onMounted(async () => {
    const anomalyStore = useAnomalyStore()
    await anomalyStore.init()
  })
</script>
