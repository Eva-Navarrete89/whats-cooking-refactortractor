import Search from './search';

class User extends Search {
  constructor(id, name, pantry) {
    super();
    this.id = id;
    this.name = name;
    this.pantry = pantry;
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
