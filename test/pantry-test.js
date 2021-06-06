const chai = require('chai');
const expect = chai.expect;

import Pantry from '../src/pantry';
import users from '../src/data/users';
import recipeData from '../src/data/recipes';

describe('Pantry', () => {
    let pantry;
    beforeEach(() => {
        pantry = new Pantry(users[0].pantry)
    })

    it('should be a function', () => {
        expect(Pantry).to.be.a('function');
    })

    it('should create an instance of Pantry', () => {
        expect(pantry).to.be.an.instanceOf(Pantry);
    })

    it('should have an array of user ingredients', () => {
        expect(pantry.contents[0].ingredient).to.equal(11477);
    })

    it('should check if user has enough ingredients for a recipe', () => {
        let sampleRecipe = recipeData[0];
        let canMake = pantry.checkCanMakeRecipe(sampleRecipe);
        let failResponse = "Sorry, you don't have all the ingredients needed!"

        expect(canMake).to.equal(failResponse);
    })

    it.only('should return what ingredients are still needed and their amount', () => {
        let sampleRecipe = recipeData[0]
        let missingIngredients = pantry.findIngredientsNecessary(sampleRecipe);
        let ingredients = {"1012047": 24, "10019903": 2};

        expect(missingIngredients).to.deep.equal(ingredients);    
    })
})