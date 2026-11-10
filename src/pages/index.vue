<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mt-6 mb-1">
      Anomalies NASA
    </h1>
    <p
      v-if="anomalyStore.totalAnomalies > 0"
      class="text-body-2 text-medium-emphasis mb-6"
    >
      <template v-if="sortedAnomalies.length === anomalyStore.totalAnomalies">
        {{ anomalyStore.totalAnomalies }} anomalies
      </template>
      <template v-else>
        {{ sortedAnomalies.length }} sur {{ anomalyStore.totalAnomalies }} anomalies
      </template>
    </p>
    <div
      v-else
      class="mb-6"
    />

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

      <!-- Filtre par centre NASA -->
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <v-select
          v-model="selectedCenter"
          clearable
          density="compact"
          hide-details
          :items="anomalyStore.centers"
          label="Filtrer par centre"
          prepend-inner-icon="mdi-filter"
          variant="outlined"
        />
      </v-col>

      <!-- Tri alphabétique : alterne entre A → Z et Z → A -->
      <v-col
        class="d-flex align-center"
        cols="12"
        md="4"
      >
        <v-btn
          :prepend-icon="sortOrder === 'asc'
            ? 'mdi-sort-alphabetical-ascending'
            : 'mdi-sort-alphabetical-descending'"
          variant="outlined"
          @click="toggleSort"
        >
          Tri {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
        </v-btn>
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
      v-else-if="sortedAnomalies.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      Aucune anomalie ne correspond à votre recherche ou à votre filtre.
    </v-alert>

    <!-- Grille de cartes (cas normal) -->
    <v-row v-else>
      <v-col
        v-for="anomaly in sortedAnomalies"
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
  const selectedCenter = ref(null)
  const sortOrder = ref('asc')

  // Computed chaînés : anomalies → filteredByCenter → filteredBySearch → sortedAnomalies
  // Les données du store ne sont jamais modifiées

  const filteredByCenter = computed(() => {
    if (!selectedCenter.value) {
      return anomalyStore.anomalies
    }
    return anomalyStore.anomalies.filter(anomaly => anomaly.center === selectedCenter.value)
  })

  const filteredBySearch = computed(() => {
    if (!searchQuery.value) {
      return filteredByCenter.value
    }
    const query = searchQuery.value.toLowerCase()
    return filteredByCenter.value.filter(anomaly =>
      anomaly.title.toLowerCase().includes(query),
    )
  })

  // toSorted() renvoie une copie triée : le résultat filtré n'est pas modifié
  const sortedAnomalies = computed(() => {
    return filteredBySearch.value.toSorted((a, b) => {
      const comparison = a.title.localeCompare(b.title, 'fr')
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  })

  function toggleSort () {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }
</script>
