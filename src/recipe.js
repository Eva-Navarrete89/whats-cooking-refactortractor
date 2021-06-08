class Recipe {
  constructor(recipe, ingredientData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.ingredientsData = ingredientData;
    this.ingredientCost = 0;

    // console.log('jnddkbvldj', recipe.ingredients);
    // console.log('yo', recipe);
  }

  retrieveRecipeInstructions() {
    return this.instructions;
  }

  retrieveIngredientName() {
    const ingredientsId = this.ingredients.map(ingredient => ingredient.id);
    const ingredientName = this.ingredientsData.reduce((acc, ingredient) => {
      ingredientsId.forEach(id => {
        if(id === ingredient.id) {
          acc.push(ingredient.name)
        }
      });
      return acc;
    }, []);
    return ingredientName;
  }

  calculateCost(ingredient) {
    this.ingredientCost = this.ingredients.reduce((acc, currentVal) => {
      ingredient.forEach(ingredient => {
        if (currentVal.id === ingredient.id) {
          acc = (ingredient.estimatedCostInCents * currentVal.quantity.amount)
        }
      })
      return acc;
    }, 0);





    // refactor this after WE are badasses and have full functionality on page. ----->reduce!
    // let costCounter = 0;
    // this.ingredients.forEach(ingredient => {
    //   this.ingredientsData.find(specificIngredient => {
    //     if (specificIngredient.id === ingredient.id) {
    //       costCounter += (Number(specificIngredient.estimatedCostInCents) *
    //       Number(ingredient.quantity.amount))
    //     }
    //   })
    // });
    // return costCounter;
  }
  // findInstructions() {
  //   return this.instructions;
  // }

}

export default Recipe;
