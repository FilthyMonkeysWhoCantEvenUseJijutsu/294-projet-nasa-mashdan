<template>
  <v-container>
    <v-btn
      class="mb-4"
      prepend-icon="mdi-arrow-left"
      text="Retour"
      variant="text"
      @click="$router.back()"
    />

    <v-alert
      v-if="!anomaly"
      type="error"
      variant="tonal"
    >
      Anomalie non trouvée.
    </v-alert>

    <v-card v-else>
      <v-img
        cover
        height="360"
        :src="imageUrl(anomaly)"
      />

      <v-card-title class="text-h5 text-wrap">
        {{ anomaly.title }}
      </v-card-title>

      <v-card-text>
        <div class="d-flex flex-wrap ga-2 mb-4">
          <v-chip prepend-icon="mdi-calendar">
            {{ formatDate(anomaly.dateCreated) }}
          </v-chip>
          <v-chip prepend-icon="mdi-domain">
            {{ anomaly.center }}
          </v-chip>
          <v-chip
            v-if="anomaly.location"
            prepend-icon="mdi-map-marker"
          >
            {{ anomaly.location }}
          </v-chip>
        </div>

        <p class="mb-4">
          {{ plainText(anomaly.description) }}
        </p>

        <div class="d-flex flex-wrap ga-2">
          <v-chip
            v-for="keyword in keywords"
            :key="keyword"
            size="small"
            variant="outlined"
          >
            {{ keyword }}
          </v-chip>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          append-icon="mdi-open-in-new"
          :href="`https://images.nasa.gov/details/${anomaly.nasaId}`"
          target="_blank"
          text="Voir sur NASA Images"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useAnomalyStore } from '@/stores/anomalyStore'
  import { formatDate, imageUrl, parseKeywords, plainText } from '@/utils/anomaly'

  const route = useRoute()
  const anomalyStore = useAnomalyStore()

  const anomaly = computed(() => anomalyStore.getAnomalyById(route.params.id))
  const keywords = computed(() => parseKeywords(anomaly.value?.keywords).slice(0, 8))
</script>
