import Search from './search';

class User extends Search {
  constructor(userData) {
    super();
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = userData.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = []; 
  }

  addToFavorites(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe)
    }
  }

  removeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1)
  }

  filterFavorites(tag) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

  findFavorites(dishNameorIngredient) {
    let lowerCaseSearch = dishNameorIngredient.toLowerCase();
    return this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(lowerCaseSearch)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(lowerCaseSearch)
      });
    });
  }
}


export default User;
