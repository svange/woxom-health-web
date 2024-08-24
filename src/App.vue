<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-avatar
          class="me-4"
          color="grey-darken-1"
          image="../assets/woxom_bot.png"
          size="32"
        />

        <v-btn
          v-for="link in links"
          :key="link"
          text=""
          :to="link.path"
          variant="text"
        >
          {{ link.name }}
        </v-btn>

        <v-spacer />

        <v-responsive max-width="160">
          <v-text-field
            density="compact"
            flat
            hide-details
            label="Search"
            rounded="lg"
            single-line
            variant="solo-filled"
          />
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <!-- Include the Chat Bot Component -->
    <ChatBot />
  </v-app>
</template>

<script lang="ts" setup>
  import ChatBot from './components/ChatBot.vue' // Import the ChatBot component
  const links = [
    { name: 'Home', path: '/home' },
    { name: 'Health', path: '/health' },
    { name: 'Life', path: '/life' },
    { name: 'Supplemental', path: '/supplemental' },
    { name: 'About', path: '/about' },
  ]
</script>
