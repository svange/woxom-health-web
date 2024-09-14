<template>
  <v-parallax
    height="400"
    :lazy-src="placeholderImage"
    src="../assets/supplement/supplement_bg.jpeg"
    @error="handleImageError"
  >
    <div class="dark-overlay" />

    <v-container class="d-flex align-center justify-center fill-height content-section">
      <div class="text-center text-white">
        <div class="mb-2 text-h1 font-weight-medium">About</div>
      </div>
    </v-container>
  </v-parallax>

  <div class="container">
    <div class="text-primary mx-auto">
      <div class="py-10 text-center px-xs-10 ">
        <div class="text-h6 font-weight-medium sub-section-container mx-auto">
          With a dedicated health agent, we are here for you. By taking the time to get to know our clients we promise
          to
          put you in the best situation for you and your family. Give us a chance to make this the greatest experience
          you've ever had in purchasing a health plan for your family.
        </div>
      </div>
    </div>
    <v-divider />
    <div class="text-center py-10">
      <div class="text-h4 text-secondary pb-8 font-weight-medium">Meet Our Agents</div>
      <v-container class="d-flex justify-center">
        <v-row dense>
          <v-col
            v-for="(item, index) in cards"
            :key="index"
            cols="12"
            md="3"
          >
            <v-img
              :alt="item.alt"
              :lazy-src="placeholderImage"
              :src="item.src"
              @error="handleImageError"
            />
            <div class="text-h6 text-primary mt-5">{{ item.name }}</div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-divider />
    <div class="text-center py-10">
      <div class="text-h4 text-secondary pb-14 font-weight-medium">Meet Our Bot</div>
      <div class="text-h3 font-weight-medium text-primary">Hi, I'm Woxom</div>
      <div class="text-subtitle-1 font-weight-medium text-primary my-6 sub-section-container mx-auto">
        With integrated technology, never have to talk
        to a health agent again!
      </div>
      <v-img
        alt="WOXOM BOT"
        height="420px"
        :lazy-src="placeholderImage"
        src="../assets/woxom_bot.png"
        @error="handleImageError"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import Logo1 from '../assets/about/about_team_1.jpg'
  import Logo2 from '../assets/about/about_team_2.jpg'
  import Logo3 from '../assets/about/about_team_3.jpg'
  import Logo4 from '../assets/about/about_team_4.jpg'

  const cards = ref([
    { src: Logo1, alt: 'Team Image 1', name: 'Cam' },
    { src: Logo2, alt: 'Team Image 2', name: 'Adam' },
    { src: Logo3, alt: 'Team Image 3', name: 'John' },
    { src: Logo4, alt: 'Team Image 4', name: 'Sean' },
  ])

  const placeholderImage = ref('https://th.bing.com/th/id/OIP.Yw2F5lvYM-R4aFk1fz4XnAHaEK?rs=1&pid=ImgDetMain')

  const handleImageError = (event: { target: { src: any; }; }) => {
    console.error('Image failed to load:', event)
    event.target.src = placeholderImage.value
  }
</script>
