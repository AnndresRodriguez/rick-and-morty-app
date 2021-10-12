<template>
  <modal name="modal-character" height="700" :adaptive="true">
    <div class="modal modal-banner">
      <img src="@/assets/img/rick-and-morty-100.jpg" alt="banner-img" />
    </div>

    <img
      :src="character.image"
      class="modal-photo animate__animated animate__fadeInDown"
      :alt="character.name"
    />

    <div class="modal-status animate__animated animate__fadeInDown">
      <div class="d-flex justify-content-center align-items-center">
        <h2 class="text-center  me-2">{{ character.name }}</h2>
        <h5 class="text-center">({{ character.species }})</h5>
      </div>
      <div
        class="info__status info__status-modal"
        :class="getColorStatus(character.status)"
      >
        {{ character.status }}
      </div>
    </div>

    <div class="modal-info">
      <div class="modal-info__description animate__animated animate__fadeInUp">
        <i
          class="fa fa-2x"
          :class="getIconGender(character.gender)"
          aria-hidden="true"
        ></i>
        <h5>{{ character.gender }}</h5>
      </div>
      <div class="modal-info__description">
        <i class="fa fa-globe fa-2x" aria-hidden="true"></i>
        <h5 class="description__text text-center">
          {{ character.origin.name }}
        </h5>
      </div>
      <div class="modal-info__description animate__animated animate__fadeInUp">
        <i class="fa fa-reddit-alien fa-2x" aria-hidden="true"></i>
        <h5 class="description__text">
          {{ getTypeCharacter(character.type) }}
        </h5>
      </div>
    </div>

    <div class="d-flex justify-content-center animate__animated animate__fadeInUp">
      <button class="btn btn-success btn-lg animate__animated animate__zoomIn animate__delay-2s" @click="displayEpisodes">
        <i class="fa fa-video-camera" aria-hidden="true"></i>
        View Episodes
      </button>
    </div>

    <div class="modal-episodes mt-4">
      <div>
        <h2 class="text-center">Another Intersting Characters</h2>

        <carousel
          autoplay
          autoplayHoverPause
          :perPage="1"
          paginationEnabled
          class="mt-4"
        >
          <slide
            v-for="(character, index) in interestingCharacters"
            :key="index"
          >
            <Card
              :character="character"
              @show-character="showInfoCharacter(character.id)"
              customstyle="max-height-card"
            />
          </slide>
        </carousel>
      </div>
    </div>
  </modal>
</template>
<script>
import mixinClasses from "../mixins";
import Card from "./Card.vue";
import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Card,
    Carousel,
    Slide
  },
  mixins: [mixinClasses],
  props: {
    character: {
      type: Object
    },
    interestingCharacters: {
      type: Array
    }
  },
  methods: {
    displayEpisodes(){
       this.$emit('display-episodes');
    },

    showInfoCharacter(id){
      this.$emit('show-info-character', id);
    }
  }
};
</script>
