<template>
  <div>
    <!-- Chat Bot Button -->
    <v-btn
      class="chat-bot-btn"
      icon
      large
      @click="toggleChat"
    >
      <v-avatar
        color="primary"
        image="../assets/woxom_bot.png"
        size="56"
      />
    </v-btn>

    <!-- Chat Dialog -->
    <v-card
      v-if="chatVisible"
      class="chat-card"
      elevation="10"
    >
      <v-card-title>
        Chat with Woxom Bot
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-textarea
                v-model="chatMessages"
                readonly
                rows="6"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="userMessage"
                label="Type a message"
                @keyup.enter="sendMessage"
              />
            </v-col>
            <v-col cols="2">
              <v-btn
                icon
                @click="sendMessage"
              >
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const chatVisible = ref(false)
  const chatMessages = ref('')
  const userMessage = ref('')
  const toggleChat = () => {
    chatVisible.value = !chatVisible.value
  }
  const sendMessage = () => {
    if (userMessage.value.trim() !== '') {
      chatMessages.value += `You: ${userMessage.value}\n`
      // Simulate bot response (replace with real bot logic)
      chatMessages.value += `Bot: I am here to help!\n`
      userMessage.value = ''
    }
  }
</script>

<style scoped>
.chat-bot-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.chat-card {
  position: fixed;
  bottom: 90px; /* Adjust this based on the height of your chat bot button */
  right: 24px;
  width: 320px; /* Adjust the width as needed */
  max-height: 400px;
  display: flex;
  flex-direction: column;
  z-index: 999;
}
</style>
