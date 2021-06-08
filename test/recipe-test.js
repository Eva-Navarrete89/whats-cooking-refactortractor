import {
  expect
} from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientData from '../src/data/ingredients.js';


describe('Recipe', () => {
  let recipe, ingredient;
  beforeEach(() => {
    recipe = new Recipe(recipeData[47], ingredientData);

    ingredient = [{
        "id": 10018413,
        "name": "flatbread",
        "estimatedCostInCents": 326
      }];
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

  it('Should have  list of ingredients', () => {
    expect(recipe.ingredients).to.equal(recipeData[47].ingredients);
  });

  it('Should have list of insturctions', () => {
    expect(recipe.instructions).to.equal(recipeData[47].instructions);
  });

  it('Should contain a property that contains the ingredients data', () => {
    expect(recipe.ingredientsData).to.equal(ingredientData);
  });

  it('Should contain a method that returns recipe instructions', () => {
    recipe.retrieveRecipeInstructions();
    expect(recipe.instructions).to.deep.equal([{
        number: 1,
        instruction: 'Saute the zucchini in the olive oil on high heat. Season generously with salt and pepper. Stir and leave alone for a little while, so you get a little bit of texture from the browning on the zucchini.While you’re sauteing, toast the flatbread in the oven at 400 degrees.When the zucchini is soft and just slightly browned, remove from the heat. Take the flatbread out of the oven and spread the zucchini on the flatbread.Top with the fresh tomatoes, cheese, and fresh basil.'
      },
      {
        number: 2,
        instruction: 'Cut, serve, and enjoy!'
      }
    ]);
  });

  it('Should contain method that determines the names of recipes need', () => {
    recipe.retrieveIngredientName();
    expect(recipe.ingredients).to.deep.equal([{
        name: 'cheese',
        id: 1041009,
        quantity: {
          amount: 2,
          unit: 'tablespoons'
        }
      },
      {
        name: 'flatbread',
        id: 10018413,
        quantity: {
          amount: 1,
          unit: ''
        }
      },
      {
        name: 'fresh basil',
        id: 2044,
        quantity: {
          amount: 3,
          unit: 'leaves'
        }
      },
      {
        name: 'grape tomatoes',
        id: 10111529,
        quantity: {
          amount: 0.5,
          unit: 'cup'
        }
      },
      {
        name: 'olive oil',
        id: 4053,
        quantity: {
          amount: 1,
          unit: 'teaspoon'
        }
      },
      {
        name: 'zucchini',
        id: 11477,
        quantity: {
          amount: 1,
          unit: 'cup'
        }
      }
    ])
  })

  it.only('Should be able to calculate the cost of its ingredients', () => {
    recipe.calculateCost(ingredient);
    expect(recipe.ingredientCost).to.equal(326);
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
