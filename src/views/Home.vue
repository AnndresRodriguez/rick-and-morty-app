<template>
  <div class="home">
    <banner
      v-model="itemsSearch.characterToFind"
      @get-data-by-name="getDataByName"
    />

    <div class="container green borderXwidth">
      <a
        v-for="(filter, index) in filters"
        :key="index"
        @click="getDataByFilter(filter.key, filter.param, $event)"
        >{{ filter.name }}</a
      >
    </div>

    <searchtext
      :keytext="itemsSearch.keytext"
      :param="itemsSearch.param"
      :nameCharacter="nameCharacter"
    />

    <div
      class="mx-auto mt-5 container-main-icon container-button-favorites"
      @click="showFavorites"
    >
      <div
        class="favorite-icon me-3 container-main-icon container-icon-favorites"
      >
        <i
          class="fa fa-star fa-2x favorite-icon__selected"
          aria-hidden="true"
        ></i>
      </div>
      <div>
        <h3 class="mb-0">My Favorites</h3>
      </div>
    </div>

    <template v-if="displayFavorites && favorites.length == 0">
      <not-found @show-all="getAllCharacters" />
    </template>

    <template v-else>
      <div class="cards ">
        <template v-if="characters.length == 0">
          <div class="lds-dual-ring"></div>
        </template>
        <template v-else>
          <template v-for="(character, index) in characters">
            <Card
              :character="character"
              :key="index"
              @show-character="showInfoCharacter(character.id)"
              @select-favorite="insertfavorite(character)"
            />
          </template>
        </template>
      </div>
    </template>

    <Paginator
      v-if="!displayFavorites && characters.length > 0"
      :itemsSearch="itemsSearch"
      :cantPages="cantPages"
      @send-prev-page="prevPage"
      @send-next-page="nextPage"
      @send-new-characters="getNewCharacters($event)"
    />

    <modalcharacter
      :character="characterInfo"
      :interestingCharacters="interestingCharacters"
      @display-episodes="displayEpisodes"
      @show-info-character="showInfoCharacter($event)"
    />

    <modalepisodes :episodes="episodes" />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
// --------------------Components--------------------
import searchtext from "../components/SearchText.vue";
import Paginator from "../components/Paginator.vue";
import modalcharacter from "../components/ModalCharacter.vue";
import modalepisodes from "../components/ModalEpisodes.vue";
import notFound from "../components/NotFoundFavorites.vue";
import banner from "../components/Banner.vue";
import { filters, sanitizeText, getNumberPage, createArrayIds } from "../util/";
import mixinClasses from "../mixins";
import favorites from "../mixins/favorite";

export default {
  name: "Home",
  mixins: [mixinClasses, favorites],
  components: {
    Card,
    searchtext,
    Paginator,
    modalcharacter,
    modalepisodes,
    banner,
    notFound,
  },

  created() {
    this.getAllCharacters();
    this.getFiltersSelected();
  },

  data() {
    return {
      characters: [],
      favorites: [],
      filters,
      nameCharacter: "",
      displayFavorites: false,
      info: "",
      cantPages: 0,
      episodes: [],
      interestingCharacters: [],
      itemsSearch: {
        prev: "",
        next: "",
        itemActive: 1,
        keytext: "",
        param: "",
        characterToFind: "",
      },
      lastInsertId: 0,
    };
  },

  methods: {
    async getDataByName() {
      this.itemsSearch.keytext = "";
      this.nameCharacter = this.itemsSearch.characterToFind;
      let response = await this.$http.get(
        `character/?name=${sanitizeText(this.itemsSearch.characterToFind)}`
      );
      this.updateDataSearch(response.data.results, response.data.info);
    },

    async getAllCharacters() {
      let response = await this.$http.get("character");
      this.updateDataSearch(response.data.results, response.data.info);
    },

    async getNewCharacters(page) {
      this.itemsSearch.itemActive = page;
      this.itemsSearch.keytext = "";
      this.nameCharacter = "";
      let response = await this.$http.get(`character/?page=${page}`);
      this.updateDataSearch(response.data.results, response.data.info);
    },

    async prevPage() {
      let response = await this.$http.get(
        `character/?page=${this.itemsSearch.prev}`
      );
      if (this.itemsSearch.itemActive >= 1) {
        this.itemsSearch.itemActive = this.itemsSearch.itemActive - 1;
      }
      this.updateDataSearch(response.data.results, response.data.info);
    },

    async nextPage() {
      let response = await this.$http.get(
        `character/?page=${this.itemsSearch.next}`
      );
      if (this.itemsSearch.itemActive <= 20) {
        this.itemsSearch.itemActive = this.itemsSearch.itemActive + 1;
      }
      this.updateDataSearch(response.data.results, response.data.info);
    },

    async sendRequest(filter, param) {
      if (filter.localeCompare("character") === 0) {
        this.getAllCharacters();
        this.itemsSearch.keytext = "All";
      } else {
        let response = await this.$http.get(`character/?${param}=${filter}`);
        this.updateDataSearch(response.data.results, response.data.info);
      }
    },

    storeSearchUser() {
      localStorage.setItem("search", JSON.stringify(this.itemsSearch));
    },

    getDataByFilter(filter, param, event) {
      event.preventDefault();
      this.updateDataFilters(param, filter);
      this.sendRequest(filter, param);
    },

    getFiltersSelected() {
      if (localStorage.getItem("search") !== null) {
        let dataStored = JSON.parse(localStorage.getItem("search"));
        this.itemsSearch = { ...dataStored };
      }
    },

    async getCharacterById(id) {
      this.characterInfo = await this.getAllCharactersById(id);
      this.episodes = await this.getEpisodesByCharacter();
      this.interestingCharacters = await this.getInterestingCharacters();
    },

    showInfoCharacter(id) {
      this.getCharacterById(id);
      this.$modal.show("modal-character");
    },

    displayEpisodes() {
      this.$modal.show("episodes");
    },

    updateDataCharacters(characters) {
      this.characters = [];
      this.characters = characters.slice(0, 18);
    },

    updateDataPaginator(info) {
      this.info = info;
      this.cantPages = Math.ceil(this.info.count / this.paginatorResizing());
      this.itemsSearch.prev = getNumberPage(info.prev);
      this.itemsSearch.next = getNumberPage(info.next);
    },

    updateDataFilters(param, filter) {
      this.nameCharacter = "";
      this.itemsSearch.param = param;
      this.itemsSearch.keytext = filter;
    },

    updateDataSearch(characters, info) {
      this.displayFavorites = false;
      this.updateDataCharacters(characters);
      this.updateDataPaginator(info);
      this.storeSearchUser();
    },

    paginatorResizing() {
      return window.innerWidth < 1024
        ? (this.info.pages = this.info.pages * 4)
        : this.info.pages;
    },

    generateArrayIDS() {
      return createArrayIds();
    },
  },
};
</script>
