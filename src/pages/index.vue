<template>
  <v-container>
    <h1 class="text-h4 my-6">
      Anomalies NASA
    </h1>

    <!-- Barre de recherche : v-model lie le champ au ref searchQuery -->
    <v-row class="mb-4">
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-text-field
          v-model="searchQuery"
          clearable
          density="compact"
          hide-details
          label="Rechercher une anomalie"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        />
      </v-col>
    </v-row>

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

    <!-- Message si aucun résultat pour la recherche -->
    <v-alert
      v-else-if="filteredBySearch.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      Aucune anomalie ne correspond à votre recherche.
    </v-alert>

    <!-- Grille de cartes (cas normal) -->
    <v-row v-else>
      <v-col
        v-for="anomaly in filteredBySearch"
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

  const searchQuery = ref('')

  // Vue filtrée par titre : ne modifie jamais les données du store
  const filteredBySearch = computed(() => {
    if (!searchQuery.value) {
      return anomalyStore.anomalies
    }
    const query = searchQuery.value.toLowerCase()
    return anomalyStore.anomalies.filter(anomaly =>
      anomaly.title.toLowerCase().includes(query),
    )
  })
</script>
