<template>
  <v-container>
    <h1 class="text-h4 my-6">
      Anomalies NASA
    </h1>

    <v-row>
      <v-col
        v-for="anomaly in anomalies"
        :key="anomaly.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card class="h-100">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { formatDate, imageUrl } from '@/utils/anomaly'

  const anomalies = ref([])

  onMounted(async () => {
    const response = await fetch('https://apis.divtec.me/api/nasa/anomaly?limit=100')
    const json = await response.json()
    anomalies.value = json.data
    console.log('Anomalies chargées :', anomalies.value)
  })
</script>
