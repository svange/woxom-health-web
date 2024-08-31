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

<!--<script>-->
<!--import axios from "axios";-->
<!--import MarkdownIt from "markdown-it";-->
<!--import CryptoJS from "crypto-js";-->

<!--const md = new MarkdownIt();-->
<!--const apiKey = import.meta.env.VITE_OB_API_KEY;-->
<!--const secretKey = "sorry_nothing_interesting_here_just_for_obfuscation";-->
<!--const clientId = import.meta.env.VITE_OB_CLIENT_ID;-->
<!--const defaultProfile = import.meta.env.VITE_OB_DEFAULT_AGENT_CONFIG_PROFILE;-->
<!--const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;-->
<!--const encryptedApiKey = CryptoJS.AES.encrypt(apiKey, secretKey).toString();-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      userMessage: "",-->
<!--      chatHistory: [],-->
<!--      isLoading: false,-->
<!--      sessionId: null,-->
<!--      isFirstMessage: true,-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.sendInitialMessage();-->
<!--  },-->
<!--  methods: {-->
<!--    decryptApiKey(encryptedApiKey, secretKey) {-->
<!--      const decrypted = CryptoJS.AES.decrypt(encryptedApiKey, secretKey);-->
<!--      return decrypted.toString(CryptoJS.enc.Utf8);-->
<!--    },-->
<!--    async sendInitialMessage() {-->
<!--      this.isLoading = true;-->
<!--      const decryptedApiKey = this.decryptApiKey(encryptedApiKey, secretKey);-->
<!--      const payload = {-->
<!--        client_id: clientId,-->
<!--        reset: true,-->
<!--        agent_config: defaultProfile,-->
<!--      };-->

<!--      try {-->
<!--        const response = await axios.post(apiEndpoint, payload, {-->
<!--          headers: {-->
<!--            "x-api-key": decryptedApiKey,-->
<!--          },-->
<!--          withCredentials: true,-->
<!--        });-->
<!--        this.sessionId = response.data.session_id;-->
<!--        this.chatHistory.push({-->
<!--          type: "bot",-->
<!--          message: response.data.message,-->
<!--        });-->
<!--        this.initialMessageReceived = true; // set to true here-->
<!--      } catch (error) {-->
<!--        console.error("Error sending initial message:", error);-->
<!--      } finally {-->
<!--        this.isLoading = false;-->
<!--      }-->
<!--    },-->
<!--    async sendMessage() {-->
<!--      this.isLoading = true;-->

<!--      // Immediately show the user's message and avatar-->
<!--      this.chatHistory.push({-->
<!--        type: 'user',-->
<!--        message: this.userMessage,-->
<!--      });-->

<!--      const decryptedApiKey = this.decryptApiKey(encryptedApiKey, secretKey);-->
<!--      const payload = {-->
<!--        client_id: clientId,-->
<!--        message: this.userMessage,-->
<!--      };-->

<!--      try {-->
<!--        const response = await axios.post(apiEndpoint, payload, {-->
<!--          headers: {-->
<!--            'x-api-key': decryptedApiKey,-->
<!--          },-->
<!--          withCredentials: true,-->
<!--        });-->
<!--        // Update the bot's reply-->
<!--        this.chatHistory.push({-->
<!--          type: 'bot',-->
<!--          message: response.data.message,-->
<!--        });-->
<!--      } catch (error) {-->
<!--        console.error('Error sending message:', error);-->
<!--      } finally {-->
<!--        this.isLoading = false;-->
<!--      }-->
<!--    }-->

<!--  },-->
<!--  computed: {-->
<!--    formattedChatHistory() {-->
<!--      return this.chatHistory.map((entry) => {-->
<!--        return {-->
<!--          type: entry.type,-->
<!--          message: md.render(entry.message),-->
<!--        };-->
<!--      });-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->


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
