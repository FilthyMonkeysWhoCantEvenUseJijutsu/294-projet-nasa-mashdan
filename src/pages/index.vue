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
        <AnomalyCard :anomaly="anomaly" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const anomalies = ref([])

  onMounted(async () => {
    const response = await fetch('https://apis.divtec.me/api/nasa/anomaly?limit=100')
    const json = await response.json()
    anomalies.value = json.data
    console.log('Anomalies chargées :', anomalies.value)
  })
</script>
