import './css/base.scss';
import './css/styles.scss';

import domUpdates from './domUpdates';
// import recipeData from './data/recipes';
// For ingredientData create a fetch call and assign it to a global variable also for (recipesData?)'
import ingredientsData from './data/ingredients';
// import users from './data/users';
import { fetchApiCalls } from './apiCalls'

import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';

let favButton = document.querySelector('.view-favorites');
let toCookButton = document.querySelector('.recipes-to-cook');
let homeButton = document.querySelector('.home')
let searchButton = document.querySelector('.search-button');
let inputSearch = document.querySelector('.search-input');
let checkBoxes = document.querySelectorAll("input[type=checkbox]");
let submitTagsButton = document.querySelector('#submitTagsButton');
let cardArea = document.querySelector('.all-cards');
// let cookbook = new Cookbook(recipeData);
/////// create a fetch call to update the recipeData !
let user, pantry, cookbook;


homeButton.addEventListener('click', cardButtonConditionals);
searchButton.addEventListener('click', searchByNameIng);
submitTagsButton.addEventListener('click', searchByTags);
favButton.addEventListener('click', viewFavorites);
toCookButton.addEventListener('click', viewRecipesToCook);
cardArea.addEventListener('click', cardButtonConditionals);
window.onload = generateUser();

// Functions
function preventDefault() {
  event.preventDefault()
}




////////////////////////////////  FETCH CALLS

function generateUser() {
  fetchApiCalls('users')
  .then(data => {
    // console.log('hola', data.usersData.length);
    const randomUserNum = Math.floor(Math.random() * data.usersData.length);
    let matchingUser = data.usersData.find((item) => {
      if (item.id === randomUserNum) {
        return item;
      }
    })
    user = new User(matchingUser);
    // console.log(user);
    pantry = new Pantry(user.pantry)
    domUpdates.displayGreetUser(user);
    // populateCards(cookbook.recipes);
    recipeData()
  })
}


function recipeData(){
  let recipePromise = fetchApiCalls('recipes')
 .then(data => {
   let recipeData = data.recipeData;

  let cookbook = new Cookbook(data.recipeData);
  // console
  populateCards(cookbook.recipesData);
  addToCook(cookbook.recipes)
  favoriteCard(cookbook.recipes)
  viewRecipesToCook(cookbook.recipes)
  viewFavorites(cookbook.recipes)
  searchByTags(cookbook.recipes)
    // console.log('ing', recipeData);
 })
}




//////  FILTER RECIPES BY - TAGS & TEST (NAME & ING)
function searchByNameIng() {
  preventDefault()
  // Works for SEARCH BY ALL RECIPES
  // if (!cardArea.classList.contains('all')) {
  //   const searchText = cookbook.findRecipe(inputSearch.value);
  //   populateCards(searchText);
  // }
  // console.log(cookbook.recipes);
  // Works for SEARCH BY FAVORITES
  if (!cardArea.classList.contains('favorite')) {
    const searchTextFav = user.findFavorites(inputSearch.value);
    populateCards(searchTextFav);
  }
}

//------------------------------------------------------
/// Function filter recipes by "TAGS" based on (user.favoriteRecipes)
function searchByTags(cookbook) {
  preventDefault()
  let checkBoxMatches = [];
  checkBoxes.forEach(checkBox => {
    if (checkBox.checked) {
      checkBoxMatches.push(checkBox.value)
    }
  })
  // Works for FILTER BY ALL RECIPES
  if (!cardArea.classList.contains('all')) {
    let tagMatches = cookbook.filterRecipesTags(checkBoxMatches);
    populateCards(tagMatches);
  }
// Works for FILTER BY FAVORITES
  // if (!cardArea.classList.contains('all')) {
  //   let tagMatches = user.filterFavorites(checkBoxMatches);
  //   populateCards(tagMatches);
  // }

}












//////////////////////// DOM MANIPULATION ON  ------------ (domUpdates.js)
function viewFavorites(cookbook) {
  domUpdates.displayFavorites(user, cardArea, favButton, populateCards, cookbook);

  // if (cardArea.classList.contains('all')) {
  //   cardArea.classList.remove('all')
  // }
  // if (!user.favoriteRecipes.length) {
  //   favButton.innerHTML = 'You have no favorites!';
  //   populateCards(cookbook.recipes);
  //   return
  // } else {
  //   favButton.innerHTML = 'Refresh Favorites'
  //   cardArea.innerHTML = '';
  //   user.favoriteRecipes.forEach(recipe => {
  //     cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
  //     class='card'>
  //     <header id='${recipe.id}' class='card-header'>
  //     <label for='add-button' class='hidden'>Click to add recipe</label>
  //     <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
  //     <img id='${recipe.id}' class='add'
  //     src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
  //     recipes to cook'></button>
  //     <label for='favorite-button' class='hidden'>Click to favorite recipe
  //     </label>
  //     <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite-active card-button'>
  //     </button></header>
  //     <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
  //     <img id='${recipe.id}' tabindex='0' class='card-picture'
  //     src='${recipe.image}' alt='Food from recipe'>
  //     </div>`)
  //   })
  // }
}

// Function to display recipes to cook
function viewRecipesToCook(cookbook) {
  domUpdates.displayRecipesToCook(user, cardArea, toCookButton, populateCards, cookbook)
}

// function greetUser() {
//   domUpdates.displayGreetUser(user);
  // const userName = document.querySelector('.user-name');
  // userName.innerHTML =
  // user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
  // // console.log('split1',user.name.split(' ')[0]);
  // // console.log('slipt2', user.name.split(' ')[1][0]);
  // console.log(user.name);
// Could be a <p> tags and just supply it rather than this complex (.spli())
// }

function favoriteCard(cookbook) {
  domUpdates.displayFavoriteCard(event, cookbook, favButton, user);
  // let specificRecipe = cookbook.recipes.find(recipe => {
  //   if (recipe.id  === Number(event.target.id)) {
  //     return recipe;
  //   }
  // })
  // if (!event.target.classList.contains('favorite-active')) {
  //   event.target.classList.add('favorite-active');
  //   favButton.innerHTML = 'View Favorites';
  //   user.addToFavorites(specificRecipe);
  // } else if (event.target.classList.contains('favorite-active')) {
  //   event.target.classList.remove('favorite-active');
  //   user.removeFromFavorites(specificRecipe)
  // }
}

function addToCook(cookbook) {
  domUpdates.addRecipesToCook(event, cookbook, toCookButton, user)
}

function cardButtonConditionals() {
  domUpdates.displayCardConditionals(event, favoriteCard, favButton, populateCards, cookbook, displayDirections, addToCook);
  // if (event.target.classList.contains('favorite')) {
  //   favoriteCard(event);
  // } else if (event.target.classList.contains('card-picture')) {
  //   displayDirections(event);
  // } else if (event.target.classList.contains('home')) {
  //   favButton.innerHTML = 'View Favorites';
  //   populateCards(cookbook.recipes);
  // }
}










//////////////////////// DOM MANIPULATON ON   -------------- (SCRIPT.JS)
function displayDirections(event) {
    // console.log(user);
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.id)) {
      return recipe;
    }
  })
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  let returnInstructions = recipeObject.retrieveRecipeInstructions();
  let returnIngredients = recipeObject.retrieveIngredientName();
  console.log(returnIngredients, returnInstructions);
  /// CALL FUNCTION1 AND FUNCTION2


  // MOVE TO DOM UPDATES FILE
  cardArea.classList.add('all');
  cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
  <p class='all-recipe-info'>
  <strong>It will cost: </strong><span class='cost recipe-info'>
  $${costInDollars}</span><br><br>
  <strong>You will need: </strong><span class='ingredients recipe-info'></span>
  <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
  </span></ol>
  </p>`;
  ////////////////////////////////////

  /// FUNCTION 1


  let ingredientsSpan = document.querySelector('.ingredients');
  recipeObject.ingredients.forEach(ingredient => {
    ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}</li></ul>
    `)
  })


  //// FUNCTION  2
  let instructionsSpan = document.querySelector('.instructions');
  recipeObject.instructions.forEach(instruction => {
    instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>
    `)
  })
}






// /////// NEW FUNCTION WITH FETCH  ALL
// function displayDirections() {
//   fetchApiCalls('ingredients')
//   .then(data => {
//     console.log('test', data);
//
//     let newRecipeInfo = cookbook.recipes.find(recipe => {
//       if (recipe.id === Number(event.target.id)) {
//         return recipe;
//       }
//     })
//
//     let recipeObject = new Recipe(newRecipeInfo, data.ingredientsData);
//     let cost = recipeObject.calculateCost()
//     let costInDollars = (cost / 100).toFixed(2)
//     let returnInstructions = recipeObject.retrieveRecipeInstructions();
//     let returnIngredients = recipeObject.retrieveIngredientName();
//
//     domUpdates.displayCardDirections(cardArea, recipeObject, costInDollars, returnInstructions, returnIngredients)
//   })
// }













// This function helps us when we return to the main view and the cards are stil active in the main vuew, need to make the same for the recipes to cook section
function getFavorites() {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
    })
  } else return
}

function getRecipesToCook() {
  if (user.recipesToCook.length) {
    user.recipesToCook.forEach(recipe => {
      document.querySelector(`.card${recipe.id}`).classList.remove('card-button')
    })
  } else return
}

function populateCards(recipes) {
  cardArea.innerHTML = '';
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  recipes.forEach(recipe => {
    cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
    class='card'>
        <header id='${recipe.id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button id='${recipe.id}' aria-label='add-button' class='add-button card${recipe.id} card-button'>
            <img id='${recipe.id} favorite' class='add'
            src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
            recipes to cook'>
          </button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe
          </label>
          <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'></button>
        </header>
          <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
          <img id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
    </div>`)
  })
  getFavorites();
  getRecipesToCook()
};
