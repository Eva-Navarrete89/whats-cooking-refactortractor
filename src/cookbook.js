class Cookbook {
  constructor(data) {
    this.recipes = data;
  }

  findRecipe(searchText) {
    //We are iterating over a whole array full of different recipes, each element (recipe) has name("string"), id(number), image(string)  &&&&&&
    // ingredients(array) "iside this array we have an object of multiples properties to describe the ingredient, - Name(string), Id(number), quatity(object with two properties- amount(num) and unit(string))"
    return this.recipes.filter(recipe => {
      return recipe.ingredients.find(ingredient => {
        return (ingredient.name.includes(searchText)) ||
        (recipe.name.includes(searchText))
      });
    })
  }
}

export default Cookbook;
