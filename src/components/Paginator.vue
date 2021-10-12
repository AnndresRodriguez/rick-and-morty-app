<template>
  <nav aria-label="paginator" class="mt-5 mb-5">
    <ul class="pagination pagination-lg justify-content-center">
      <li
        class="page-item banner__icon"
        :class="{ disabled: itemsSearch.prev.length == 0 }"
        @click="prevPage()"
      >
        <span class="page-link">Previous</span>
      </li>

      <li
        class="page-item"
        :class="{ ' active': page === itemsSearch.itemActive }"
        v-for="(page, index) in cantPages"
        :key="index"
      >
        <div
          class="page-link banner__icon"
          @click="getNewCharacters(index + 1)"
        >
          {{ index + 1 }}
        </div>
      </li>

      <li
        class="page-item banner__icon"
        :class="{ ' disabled': itemsSearch.next.length == 0 }"
        @click="nextPage()"
      >
        <span class="page-link">Next</span>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
    props: {
        itemsSearch: {
            type: Object,
            required: true
        },
        cantPages: {
            type: Number,
            default: 0
        }
    }, 
    methods: {
        prevPage(){
            this.$emit('send-prev-page');
        },
        nextPage(){
            this.$emit('send-next-page');
        },

        getNewCharacters(index){
            this.$emit('send-new-characters', index);
        }
    }
}
</script>
