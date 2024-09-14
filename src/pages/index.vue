<template>
  <v-parallax
    height="93vh"
    :lazy-src="placeholderImage"
    src="../assets/home/woxom_health_bg.jpg"
    @error="handleImageError"
  >
    <!-- Dark Overlay -->
    <div class="dark-overlay" />

    <v-container class="d-flex align-center justify-center fill-height content-section">
      <div class="text-center text-white">
        <div class="mb-2 text-h2 font-weight-medium">Woxom Health</div>
        <div class="text-h6 mt-6">For you, your family, and everyone you care about</div>
      </div>
    </v-container>
  </v-parallax>

  <div class="bg-indigo">
    <div class="container py-10 text-center">
      <div class="text-h3 text-primary pb-8">Health Insurance Made Simple</div>
      <div class="text-h6 text-secondary font-weight-regular">
        Picking out a health plan can be one of the most challenging and stressful experiences, and everyone
        has to go through it every year. We're here to make the process simple and straightforward, taking care to assist
        each and every one of our clients to the best of our ability.
      </div>
    </div>
  </div>

  <div class="py-10 text-center">
    <div class="text-h3 text-primary font-weight-bold py-12">What Do We Offer?</div>
    <v-container class="container d-flex justify-center">
      <v-row dense>
        <v-col cols="12" md="4">
          <v-card class="w-100 pa-2 bg-white" elevation="0">
            <v-img
              alt="Health Image"
              :lazy-src="placeholderImage"
              src="../assets/home/offer_card_1.jpg"
              @error="handleImageError"
            />
            <v-btn
              class="w-100 my-5 text-none text-subtitle-1"
              color="primary"
              flat
              to="/health"
            >
              Health
            </v-btn>

            <v-card-text align="left" class="text-h6 pa-0">
              Health Care is one of the most individualized decisions a family can make. From ACA, Private Insurance,
              Limited Medical, and everything in between, we have a solution for everyone.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="w-100 pa-2 bg-white" elevation="0">
            <v-img
              alt="Life Image"
              :lazy-src="placeholderImage"
              src="../assets/home/offer_card_2.jpg"
              @error="handleImageError"
            />
            <v-btn
              class="w-100 my-5 text-none text-subtitle-1"
              color="primary"
              flat
              to="/life"
            >
              Life
            </v-btn>

            <v-card-text align="left" class="text-h6 pa-0">
              Want to make sure your family is taken care of in a worst-case scenario? With Term & Whole Life Options,
              you no longer have to worry about your family's future.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="w-100 pa-2 bg-white" elevation="0">
            <v-img
              alt="Life Image"
              :lazy-src="placeholderImage"
              src="../assets/home/offer_card_3.jpg"
              @error="handleImageError"
            />
            <v-btn
              class="w-100 my-5 text-none text-subtitle-1"
              color="primary"
              flat
              to="/supplemental"
            >
              Supplemental
            </v-btn>

            <v-card-text align="left" class="text-h6 pa-0">
              Have health insurance, but paying too much out of pocket? With our affordable supplemental products, we
              can close that gap for you and your family.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="py-10">
      <div class="text-h5">Call us Today at <span class="font-weight-bold">866-309-1291</span></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const placeholderImage = ref('https://th.bing.com/th/id/OIP.Yw2F5lvYM-R4aFk1fz4XnAHaEK?rs=1&pid=ImgDetMain')

  const handleImageError = (event: { target: { src: any; }; }) => {
    console.error('Image failed to load:', event);
    event.target.src = placeholderImage.value;
  }
</script>
