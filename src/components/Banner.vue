<template>
  <video-background
    :src="require('@/assets/video/video-background.mp4')"
    class="video-banner"
  >
    <div class="banner">
      <img class="banner__image" src="@/assets/img/rm-title.png" />
      <div class="input-group input-group-lg banner__input">
        <span
          class="input-group-text banner__icon"
          id="search-character"
          @click="getDataByName"
        >
          <i class="fa fa-search fa-2x" aria-hidden="true"></i>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Buscar Personaje..."
          :value="value"
          @input="$emit('input', $event.target.value)"
          @keyup.enter="getDataByName"
        />
      </div>
    </div>
  </video-background>
</template>
<script>
import VideoBackground from "vue-responsive-video-background-player";
export default {
  props: ["value"],

  components: {
    VideoBackground,
  },

  methods: {
    getDataByName() {
      this.$emit("get-data-by-name");
    },
  },
};
</script>
