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
    insertfavorite(character) {
        this.updateFavorites(character);
    },

    updateFavorites(character) {

      if (this.favorites.length >= 0) {
        if (!this.existFavorite(character.id)) {
          this.lastInsertId = character.id;
          this.favorites.push(character);
        } else {
          this.deleteFavorite(character);
        }
      }
    },

    deleteFavorite(newFavorite) {
      this.favorites = this.favorites.filter((favorite) => {
        if (favorite.id !== newFavorite.id) {
          return favorite;
        }
      });
      this.characters = this.favorites;
    },

    existFavorite(id){
        return this.favorites.some(favorite => ( favorite.id == id ))
    },

    showFavorites() {
      this.characters = [];
      this.displayFavorites = true;
      this.characters = this.favorites;
    },
  },
};
