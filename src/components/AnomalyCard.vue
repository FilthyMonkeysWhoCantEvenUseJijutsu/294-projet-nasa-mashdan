<template>
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
</template>

<script setup>
  import { formatDate, imageUrl } from '@/utils/anomaly'

  defineProps({
    anomaly: { type: Object, required: true },
  })
</script>
