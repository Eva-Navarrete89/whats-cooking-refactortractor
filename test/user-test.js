import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'
import usersData from '../src/data/users';

let user1

describe('User', () => {
  beforeEach(() => {
    user1 = new User(usersData[0])
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should create new instances of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have a name, id, and pantry when initialized', () => {
    expect(user1.name).to.equal(usersData[0].name);
    expect(user1.id).to.equal(usersData[0].id);
    expect(user1.pantry).to.deep.equal(usersData[0].pantry);
  });

  it('Should have a property of favoriteRecipes with a default value', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to add recipes to favoriteRecipes', () =>{
    user1.addToFavorites(recipeData[0])
    expect(user1.favoriteRecipes.includes(recipeData[0])).to.eql(true);
  });

  it('Should be able to remove recipes from favoriteRecipes', () =>{
    user1.removeFromFavorites(recipeData);
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.eql([recipeData[0]]);
  });

  it('Should be able to search favoriteRecipes by name or ingredient', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
  });

  it('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    expect(user1.checkPantry(recipeIngredients)).to.eql('You have the ingredients!');
  });

  it('Should inform User if they lack required ingredients for a given recipe', () => {
    expect(user1.checkPantry(recipeIngredients)).to.eql(missingIngredientsWithPrice);
  });
});
