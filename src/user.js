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
      // console.log(favoriteRecipes);
    }
    return this.favoriteRecipes
  }

  removeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1)
  }


  addToCookWeek(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe)
      // console.log(favoriteRecipes);
    }
    return this.recipesToCook
  }

  removeFromToCook(recipe) {
    const i = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(i, 1)
  }



  filterFavorites(tags) {
    const favMatches = [];
    this.favoriteRecipes.forEach(recipe => {
      tags.forEach(tag => {
        if (recipe.tags.includes(tag)) {
          favMatches.push(recipe)
        }
      })
    })
      return favMatches;
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
