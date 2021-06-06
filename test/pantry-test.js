const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/Pantry');
const users = require('../data/users');
const recipes = require('../data/recipes');

describe('Pantry', () => {
    let pantry;

    beforeEach('Pantry', () => {
        pantry = new Pantry(users[0].pantry)
    })

    it('should be a function', () => {
        expect(Pantry).to.be.a('function');
    })

    it('should create an instance of Pantry', () => {
        expect(pantry).to.be.an.instanceOf(Pantry);
    })

    it('should have an array of user ingredients', function() => {
        expect(pantry.contents[0].ingredient).to.equal(11477);
    })

    it('should check if user has enough ingredients for a recipe', () => {
        let sampleRecipe = recipes[0];
        let canMake = pantry.checkCanCookRecipe(sampleRecipe);
        let failResponse = "Sorry, you don't have all the ingredients needed!"

        expect(canMake).to.equal(failResponse);
    })
})