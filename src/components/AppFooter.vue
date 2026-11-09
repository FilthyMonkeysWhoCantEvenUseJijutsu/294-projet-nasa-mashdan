<template>
  <v-footer
    app
    height="40"
  >
    <div class="text-caption text-disabled mx-auto">
      <!-- Contenu par défaut, remplaçable via le slot -->
      <slot>
        Données NASA via apis.divtec.me &mdash; Projet M294 &copy; {{ new Date().getFullYear() }}
      </slot>
    </div>
  </v-footer>
</template>
