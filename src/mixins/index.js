import { getClassSpecie, getClassStatus, getClassOrigin, getClassGender } from "../util/index";
import axios from "axios";

export default {
  data() {
    return {
      characterInfo: {
        origin: {
          name: "",
        },
      },
    }
  },
  methods: {
    getColorSpecie(specie) {
      return getClassSpecie(specie);
    },
    getColorStatus(status) {
      return getClassStatus(status);
    },
    getTypeCharacter(type) {
      return type == "" ? "Unknown" : type;
    },
    getIconOrigin(origin) {
      return getClassOrigin(origin);
    },
    getIconGender(gender) {
      return getClassGender(gender);
    },

    async getDataEpisodeById(url) {
      let response = await axios.get(url);
      return response.data;
    },

    async getEpisodesByCharacter() {
      let response = await Promise.all(
        this.characterInfo.episode.map(async (episode) => {
          return await this.getDataEpisodeById(episode);
        })
      );
      return response;
    },

    async getInterestingCharacters() {
      let response = await this.$http.get(
        `character/${this.generateArrayIDS()}`
      );
      return response.data;
    },

    async getAllCharactersById(id) {
      let response = await this.$http.get(`character/${id}`);
      return response.data;
    },
  },
};
