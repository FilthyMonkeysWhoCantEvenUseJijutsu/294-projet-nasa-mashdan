<template>
  <v-app-bar flat>
    <v-container class="d-flex align-center">
      <v-avatar
        class="mr-3 cursor-pointer"
        color="primary"
        icon="mdi-rocket-launch"
        @click="$router.push('/')"
      />

      <v-toolbar-title>NASA Anomalies</v-toolbar-title>

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
