import {
  expect
} from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';


describe('Recipe', () => {
  let recipe;
  beforeEach(() => {
    recipe = new Recipe(recipeData[47], ingredientsData);
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of recipe', () => {
    expect(recipe).to.be.instanceof(Recipe);
  });
  it('Should have a name', () => {
    expect(recipe.name).to.equal('Farmer’s Market Flatbread Pizza');

  });

  it('Should have an id', () => {
    expect(recipe.id).to.equal(601216);
  });

  it('should have an image', () => {
    expect(recipe.image).to.equal('https://spoonacular.com/recipeImages/601216-556x370.jpg')
  });

  it('Should have a tag', () => {
    expect(recipe.tags).to.deep.equal(['side dish']);
  });

  it('Should hold its own ingredient data', () => {
    expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
  });

  it('Should hold its own instruction data', () => {
    expect(recipe.instructions).to.equal(recipeData[47].instructions);
  });

  it('Should be able to calculate the cost of its ingredients', () => {
    expect(recipe.calculateCost()).to.equal(4166);
  });

});

// describe('Recipe Data', () => {

  // it('Should hold its own ingredient data', () => {
  //   expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
  // })

  // it('Should hold its own instruction data', () => {
  //   expect(recipe.instructions).to.equal(recipeData[47].instructions);
  // })
// })

// it('Should be able to calculate the cost of its ingredients', () => {
//   // console.log(ingredientsData);
//   console.log(recipe.calculateCost());
//   expect(recipe.calculateCost()).to.equal(4166);
// });


// });
