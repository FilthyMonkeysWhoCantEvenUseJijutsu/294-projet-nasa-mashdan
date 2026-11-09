<template>
  <v-container max-width="800">
    <h1 class="text-h4 my-6">
      À propos
    </h1>

    <p class="mb-4">
      Cette application affiche les anomalies de la base de données de la NASA, fournies par l'API
      <code>apis.divtec.me</code>. Elle est construite avec Vue 3 et Vuetify.
    </p>

    <v-list>
      <v-list-item
        prepend-icon="mdi-view-grid"
        subtitle="Une carte par anomalie, avec image, date et centre NASA"
        title="Liste"
      />
      <v-list-item
        prepend-icon="mdi-file-document"
        subtitle="Description, mots-clés et lien vers NASA Images"
        title="Détail"
      />
    </v-list>
  </v-container>
</template>
