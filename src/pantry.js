class Pantry {
  constructor(contents) {
    this.contents = contents;
  }

  findIngredientsNecessary(recipe) {
    let ingredientsNeeded = {};
    recipe.ingredients.forEach(ingredient => {
      ingredientsNeeded[ingredient.id] = ingredient.quantity.amount;
    })
    return ingredientsNeeded;
  }

  addMissingIngredients(ingredientsNeeded) {
    const keysData = Object.keys(ingredientsNeeded);
    return this.contents.forEach(ingredient => {
      if(keysData.includes(ingredient.ingredient.toString())) {
        ingredientsNeeded[ingredient.ingredient] -= ingredient.amount;
      }
    })
  }

  checkCanMakeRecipe(recipe) {
    let ingredientsNeeded = this.findIngredientsNecessary(recipe);
    this.addMissingIngredients(ingredientsNeeded);
    const matchedIngredients = Object.values(ingredientsNeeded).map(amount => {
      return amount < 0;
    })
    if (matchedIngredients.includes(false)) {
      return "Sorry, you don't have all the ingredients needed!"
    } else {
      return "You have everything needed! Let's get cookin!"
    }
  }

  
}

export default Pantry;
