<template>
  <v-container>
    <h1 class="text-h4 my-6">
      Anomalies NASA
    </h1>

    <v-row>
      <v-col
        v-for="anomaly in anomalyStore.anomalies"
        :key="anomaly.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <AnomalyCard :anomaly="anomaly" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useAnomalyStore } from '@/stores/anomalyStore'

  const anomalyStore = useAnomalyStore()
</script>
