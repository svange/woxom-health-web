<template>
  <v-parallax
    height="400"
    :lazy-src="placeholderImage"
    src="../assets/health/health_bg.jpeg"
  >
    <div class="dark-overlay" />

    <v-container class="d-flex align-center justify-center fill-height content-section">
      <div class="text-center text-white">
        <div class="mb-2 text-h1 font-weight-medium">Health</div>
      </div>
    </v-container>
  </v-parallax>

  <div class="container">
    <div class="text-primary mx-auto">
      <div class="py-10 text-center px-xs-10 ">
        <div class="text-h6 font-weight-medium sub-section-container mx-auto">
          You name it, we have it. From all of the major carriers,
          in every state in the nation, find the best fit for both your needs and your budget.
        </div>
      </div>
    </div>

    <v-container>
      <v-divider />
      <div class="text-h3 text-primary my-10 text-center font-weight-medium">
        Carriers
      </div>
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
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-divider />
      <div class="text-h3 font-weight-medium my-10 text-center text-primary">
        And many more...
      </div>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Logo1 from '../assets/health/health_logo_1.png'
  import Logo2 from '../assets/health/health_logo_2.png'
  import Logo3 from '../assets/health/health_logo_3.png'
  import Logo4 from '../assets/health/health_logo_4.jpg'
  import Logo5 from '../assets/health/health_logo_5.jpg'
  import Logo6 from '../assets/health/health_logo_6.png'
  import Logo7 from '../assets/health/health_logo_7.jpg'
  import Logo8 from '../assets/health/health_logo_8.jpg'

  const images = ref([
    { src: Logo1, alt: 'Supplemental Image 1' },
    { src: Logo2, alt: 'Supplemental Image 2' },
    { src: Logo3, alt: 'Supplemental Image 3' },
    { src: Logo4, alt: 'Supplemental Image 4' },
    { src: Logo5, alt: 'Supplemental Image 5' },
    { src: Logo6, alt: 'Supplemental Image 6' },
    { src: Logo7, alt: 'Supplemental Image 7' },
    { src: Logo8, alt: 'Supplemental Image 8' },
  ])

  const placeholderImage = ref('https://th.bing.com/th/id/OIP.Yw2F5lvYM-R4aFk1fz4XnAHaEK?rs=1&pid=ImgDetMain')
</script>
