<template>
  <div>
    <!-- Chat Bot Button -->
    <v-btn
        v-if="initialMessageReceived"
        class="chat-bot-btn"
        icon=""
        size="56"
        @click="toggleChat"
    >
      <v-avatar color="primary" image="../assets/woxom_bot.png" size="56" />
    </v-btn>

    <!-- Chat Dialog -->
    <v-card v-if="chatVisible" class="chat-card" elevation="10">
      <v-card-title class="d-flex align-center py-4">
        <v-avatar color="primary" image="@/assets/woxom_bot.png" size="40" class="me-2" />
        <span>Chat with Woxom Bot</span>
        <v-spacer />
        <v-btn density="comfortable" icon variant="plain" @click="chatVisible = !chatVisible">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-list style="height:90%; overflow-y: scroll">
        <v-list-item-group color="primary">
          <div class="pa-4">
            <div
                v-for="(msg, index) in formattedChatHistory"
                :key="index"
                class="d-flex mb-3"
                :class="msg.type == 'user' ? 'justify-end' : 'justify-start'"
            >
              <v-avatar v-if="msg.type == 'bot'" class="me-2">
                <v-avatar color="primary" image="../assets/woxom_bot.png" />
              </v-avatar>
              <div
                  class="message-content pa-2 rounded-lg"
                  :class="msg.type == 'user' ? 'bg-primary text-white' : 'bg-grey-lighten-3 text-black'"
                  v-html="msg.message"
              />
              <v-avatar v-if="msg.type == 'user'" class="ml-2">
                <v-icon class="text-primary">mdi-account-circle</v-icon>
              </v-avatar>
            </div>
          </div>
        </v-list-item-group>
      </v-list>
      <v-divider />
      <div class="pt-3 px-3">
        <v-row>
          <v-col>
            <v-text-field
                v-model="userMessage"
                density="comfortable"
                placeholder="Type a message"
                variant="solo"
                @keyup.enter="sendMessage"
            />
          </v-col>
          <v-col cols="2">
            <v-btn color="primary" icon="mdi-send" @click="sendMessage" />
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import CryptoJS from 'crypto-js';

interface ChatMessage {
  type: 'user' | 'bot'; // The type can only be 'user' or 'bot'
  message: string; // The message will always be a string
}

const chatVisible = ref(false)
const userMessage = ref('')
const chatHistory = ref<ChatMessage[]>([]) // An array of ChatMessage objects
const isLoading = ref(false)
const sessionId = ref(null)
const initialMessageReceived = ref(false)

const toggleChat = () => {
  chatVisible.value = !chatVisible.value;
}

// Initialize MarkdownIt
const md = new MarkdownIt()

// Environment variables
const apiKey = import.meta.env.VITE_OB_API_KEY
const secretKey = 'sorry_nothing_interesting_here_just_for_obfuscation'
const clientId = import.meta.env.VITE_OB_CLIENT_ID
const defaultProfile = import.meta.env.VITE_OB_DEFAULT_AGENT_CONFIG_PROFILE
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT
const encryptedApiKey = CryptoJS.AES.encrypt(apiKey, secretKey).toString()

// Decrypt API key
function decryptApiKey (encryptedApiKey: any, secretKey: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedApiKey, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Send initial message
async function sendInitialMessage() {
  isLoading.value = true
  const decryptedApiKey = decryptApiKey(encryptedApiKey, secretKey)
  const payload = {
    client_id: clientId,
    reset: true,
    agent_config: defaultProfile,
  }

  try {
    const response = await axios.post(apiEndpoint, payload, {
      headers: {
        'x-api-key': decryptedApiKey,
      },
      withCredentials: true,
    });
    sessionId.value = response.data.session_id
    chatHistory.value.push({
      type: 'bot',
      message: response.data.message,
    })
    initialMessageReceived.value = true
  } catch (error) {
    console.error('Error sending initial message:', error)
  } finally {
    isLoading.value = false
  }
}

// Send user message
async function sendMessage () {
  isLoading.value = true

  chatHistory.value.push({
    type: 'user',
    message: userMessage.value,
  })

  const decryptedApiKey = decryptApiKey(encryptedApiKey, secretKey);
  const payload = {
    client_id: clientId,
    message: userMessage.value,
  }

  try {
    const response = await axios.post(apiEndpoint, payload, {
      headers: {
        'x-api-key': decryptedApiKey,
      },
      withCredentials: true,
    })
    chatHistory.value.push({
      type: 'bot',
      message: response.data.message,
    })
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    isLoading.value = false;
  }
}

// Computed property
const formattedChatHistory = computed(() =>
    chatHistory.value.map((entry: ChatMessage) => ({
      type: entry.type,
      message: md.render(entry.message),
    }))
)

// Lifecycle hook
onMounted(() => {
  sendInitialMessage();
})
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
  bottom: 90px; /* Adjust based on the height of your chat bot button */
  right: 24px;
  display: flex;
  flex-direction: column;
  z-index: 999;
  border: 1px solid #ccc; /* Add a border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add elevation (shadow) */
  border-radius: 20px; /* Optional, for rounded corners */

  /* For large screens */
  width: 500px;
  height: 600px;

  /* For small screens */
  @media (max-width: 600px) {
    width: 90%;
    height: 90%;
    right: 5%;
    bottom: 5%;
  }
}
</style>
