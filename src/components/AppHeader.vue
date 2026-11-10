<template>
  <v-app-bar
    border="b"
    flat
  >
    <v-container class="d-flex align-center">
      <v-avatar
        class="mr-3 cursor-pointer"
        image="@/assets/eventide-logo.png"
        @click="$router.push('/')"
      />

      <v-toolbar-title class="app-title">
        EVENTIDE
      </v-toolbar-title>

      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :prepend-icon="link.icon"
        :text="link.title"
        :to="link.path"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup>
  const menuItems = [
    { title: 'Accueil', path: '/', icon: 'mdi-home' },
    { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
    { title: 'À propos', path: '/a-propos', icon: 'mdi-information' },
  ]
</script>

<style scoped>
  .app-title {
    font-weight: 700;
    letter-spacing: 0.18em;
  }
</style>
