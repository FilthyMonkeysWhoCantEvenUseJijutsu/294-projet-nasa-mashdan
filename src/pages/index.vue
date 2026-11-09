<template>
  <v-container>
    <h1 class="text-h4 my-6">
      Anomalies NASA
    </h1>

    <!-- Squelettes de chargement pendant la requête API -->
    <v-row v-if="anomalyStore.isLoading">
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <!-- Message d'erreur si aucune anomalie chargée -->
    <v-alert
      v-else-if="anomalyStore.anomalies.length === 0"
      class="mb-6"
      type="error"
      variant="tonal"
    >
      Impossible de charger les anomalies. Vérifiez que l'API répond sur {{ apiUrl }}.
    </v-alert>

    <!-- Grille de cartes (cas normal) -->
    <v-row v-else>
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

  // URL de l'API pour le message d'erreur
  const apiUrl = import.meta.env.VITE_API_URL || 'https://apis.divtec.me'
</script>
