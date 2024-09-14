<template>
  <v-parallax
    height="400"
    :lazy-src="placeholderImage"
    src="../assets/life/life_bg.jpeg"
    @error="handleImageError"
  >
    <div class="dark-overlay" />

    <v-container class="d-flex align-center justify-center fill-height content-section">
      <div class="text-center text-white">
        <div class="mb-2 text-h1 font-weight-medium">Life</div>
      </div>
    </v-container>
  </v-parallax>

  <div class="container">
    <div class="text-primary mx-auto">
      <div class="py-10 text-center px-xs-10 ">
        <div class="text-h6 font-weight-medium sub-section-container mx-auto">
          With options for term life, whole life, indexed life, variable life, and other types of policies, we can make sure to cover your family's needs.
        </div>
      </div>
    </div>

    <v-container>
      <v-divider />
    </v-container>
    <v-container class="d-flex justify-center">
      <v-row dense>
        <v-col
          v-for="(image, index) in images"
          :key="index"
          cols="12"
          md="6"
        >
          <v-img
            :alt="image.alt"
            height="200"
            :lazy-src="placeholderImage"
            :src="image.src"
            @error="handleImageError"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import Logo1 from '../assets/life/life_logo_1.png'
  import Logo2 from '../assets/life/life_logo_2.png'
  import Logo3 from '../assets/life/life_logo_3.png'
  import Logo4 from '../assets/life/life_logo_4.png'

  const images = ref([
    { src: Logo1, alt: 'Life Image 1' },
    { src: Logo2, alt: 'Life Image 2' },
    { src: Logo3, alt: 'Life Image 3' },
    { src: Logo4, alt: 'Life Image 4' },
  ])

  const placeholderImage = ref('https://th.bing.com/th/id/OIP.Yw2F5lvYM-R4aFk1fz4XnAHaEK?rs=1&pid=ImgDetMain')

  const handleImageError = (event: { target: { src: any; }; }) => {
    console.error('Image failed to load:', event)
    event.target.src = placeholderImage.value
  }
</script>
