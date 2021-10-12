<template>
  <div class="d-flex justify-content-center align-items-center mt-5 animate__animated animate__fadeInUp">
    <img
      src="@/assets/img/rick-thinking.jpg"
      alt="no favorites found"
      width="150"
    />
    <div class="d-flex flex-column justify-content-center align-items-center ">
      <h2 class="text-center">Apparently Rick didn't find any favorites</h2>
      <div
        class="mx-auto mt-5 container-main-icon container-button-favorites"
        @click="showAllCharacters"
      >
        <div>
          <h3 class="mb-0">Return</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    showAllCharacters() {
      this.$emit("show-all");
    },
  },
};
</script>
