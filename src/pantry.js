class Pantry {
  constructor(userIngredients) {
    this.contents = userIngredients;
  }

  findIngredientsNecessary(recipe) {
    let ingredientsNeeded = {};
    recipe.ingredients.forEach(ingredient => {
      ingredientsNeeded[ingredient.id] = ingredient.quantity.amount;
    })
    return ingredientsNeeded;
  }

  checkCanMakeRecipe(recipe) {
    let
  }
}

export default Pantry;
