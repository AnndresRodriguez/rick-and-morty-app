<template>
  <div class="container-main animate__animated animate__fadeInUp" :class="customstyle" >

    <div class="favorite-icon me-3 container-main-icon card-icon-favorite" @click="selectFavorite">
          <i class="fa fa-star fa-3x favorite-icon__principal" :class="{ ' favorite-icon__selected': checked }" aria-hidden="true"></i>
      </div>

    <!--  -->

  
    <div class="image" @click="showInfoCharacter" >
      <img class="img__content " :src="character.image" :alt="character.name" />
      <div class="img__specie animate__animated animate__fadeInUp" :class="getColorSpecie(character.species)">
        <p>{{ character.species }}</p>
      </div>
    </div>

    <div class="info" @click="showInfoCharacter" >
      <p class="info__name animate__animated animate__fadeInUp">{{ character.name }}</p>
      <div class="info__status animate__animated animate__zoomIn animate__faster animate__delay-2s" :class="getColorStatus(character.status)">
        {{ character.status }}
      </div>
      <p class="info__label">Last Known location:</p>
      <p class="info__description">{{ character.location.name }}</p>
      <p class="info__label">First Seen in:</p>
      <p class="info__description">{{ character.location.name }}</p>
    </div>
  </div>
</template>
<script>
import mixinClasses from '../mixins';
export default {
  mixins: [mixinClasses],
  props: {
    customstyle:{
      type: String,
      required: false,
      default: ''
    },
    character: {
      type: Object,
      required: true,
    },
    
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {
 
    showInfoCharacter(){
      this.$emit('show-character')
    },

    selectFavorite(){
      this.checked = !this.checked
      this.$emit('select-favorite')
    }
  },
};
</script>

