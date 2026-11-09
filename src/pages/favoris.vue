<template>
  <v-container>
    <h1 class="text-h4 my-6">
      Mes favoris ({{ anomalyStore.totalFavorites }})
    </h1>

    <!-- Message si aucun favori -->
    <v-alert
      v-if="anomalyStore.totalFavorites === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      Vous n'avez pas encore d'anomalies favorites.
      Cliquez sur le coeur d'une anomalie pour l'ajouter !
    </v-alert>

    <!-- Grille des anomalies favorites -->
    <v-row v-else>
      <v-col
        v-for="anomaly in anomalyStore.getFavorites"
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
