<template>
  <v-card
    class="h-100 d-flex flex-column"
    :to="`/anomalies/${anomaly.id}`"
  >
    <v-img
      cover
      height="200"
      :src="imageUrl(anomaly)"
    />

    <v-card-title class="text-wrap">
      {{ anomaly.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ formatDate(anomaly.dateCreated) }} · {{ anomaly.center }}
    </v-card-subtitle>

    <v-card-actions class="mt-auto">
      <v-spacer />
      <!-- .stop empêche le clic de remonter à la carte, .prevent empêche la navigation du lien -->
      <v-btn
        :class="{ 'favorite-active': anomalyStore.isFavorite(anomaly) }"
        :color="anomalyStore.isFavorite(anomaly) ? 'red' : ''"
        :icon="anomalyStore.isFavorite(anomaly) ? 'mdi-heart' : 'mdi-heart-outline'"
        variant="text"
        @click.stop.prevent="handleToggleFavorite()"
      />
    </v-card-actions>

    <!-- Confirmation affichée 2 secondes après chaque ajout ou retrait -->
    <v-snackbar
      v-model="showSnackbar"
      color="primary"
      :timeout="2000"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script setup>
  import { useAnomalyStore } from '@/stores/anomalyStore'
  import { formatDate, imageUrl } from '@/utils/anomaly'

  const props = defineProps({
    anomaly: { type: Object, required: true },
  })

  const anomalyStore = useAnomalyStore()

  const showSnackbar = ref(false)
  const snackbarMessage = ref('')

  function handleToggleFavorite () {
    const wasFavorite = anomalyStore.isFavorite(props.anomaly)
    anomalyStore.toggleFavorite(props.anomaly)
    snackbarMessage.value = wasFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris'
    showSnackbar.value = true
  }
</script>

<style scoped>
  .favorite-active {
    animation: heartbeat 0.6s ease-in-out;
  }
</style>
