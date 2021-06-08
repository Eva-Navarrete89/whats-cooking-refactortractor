class Cookbook {
  constructor(data) {
    this.recipes = data.recipesData;
  }
  findRecipe(searchText) {
    //We are iterating over a whole array full of different recipes, each element (recipe) has name("string"), id(number), image(string)  &&&&&&
    // ingredients(array) "iside this array we have an object of multiples properties to describe the ingredient, - Name(string), Id(number), quatity(object with two properties- amount(num) and unit(string))"
    // return this.recipes.filter(recipe => {
      // this code is looking inside of the ingredients property array.
    //   let lowerCaseSearch = searchText.toLowerCase();
    //   return recipe.ingredients.find(ingredient => {
    //     return (ingredient.name.includes(lowerCaseSearch)) ||
    //     (recipe.name.includes(lowerCaseSearch))
    //   });
    // })
    let lowerCaseSearch = searchText.toLowerCase();
    return this.recipes.filter(recipe => {
      return recipe.name.includes(searchText)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(searchText)
      });
    });


  }
  filterRecipesTags(tags) {
   const matches = [];
   this.recipes.forEach(recipe => {
     tags.forEach(tag => {
       if (recipe.tags.includes(tag)) {
       matches.push(recipe);
      }
     })
   })
   return matches

//Do nor work
   // return this.recipes.filter(recipe => {
   //   return recipe.tags.includes(tags);
   // });


 }
}

export default Cookbook;
