import './css/base.scss';
import './css/styles.scss';

import domUpdates from './domUpdates';
import recipeData from './data/recipes';
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
let cookbook = new Cookbook(recipeData);

let user, pantry;

window.onload = generateUser();
// window.addEventListener('load', generateUser);

// function generateNewUser() {
//   fetchApiCalls('users').then(data => {
//     console.log(data)
//     console.log(user)
//   })
// }

homeButton.addEventListener('click', cardButtonConditionals);
searchButton.addEventListener('click', searchByNameIng);
submitTagsButton.addEventListener('click', searchByTags);
favButton.addEventListener('click', viewFavorites);
toCookButton.addEventListener('click', viewRecipesToCook);
// This event listener work as a event bubbling
cardArea.addEventListener('click', cardButtonConditionals);

// Functions

function preventDefault() {
  event.preventDefault()
}


function searchByNameIng() {
  preventDefault()

  // Works for SEARCH BY ALL RECIPES
  // if (!cardArea.classList.contains('all')) {
  //   const searchText = cookbook.findRecipe(inputSearch.value);
  //   populateCards(searchText);
  // }

  // Works for SEARCH BY FAVORITES
  if (!cardArea.classList.contains('favorite')) {
    const searchTextFav = user.findFavorites(inputSearch.value);
    populateCards(searchTextFav);
  }
}



/////////////////////////////////////////
/// Function filter recipes by "TAGS" based on (user.favoriteRecipes)
function searchByTags() {
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


// function onStartup() {
//   generateUser()
//   // domUpdates.displayGreetUser(user);
//     // pantry = new Pantry(user.pantry)
//     // populateCards(cookbook.recipes);
//     // domUpdates.displayGreetUser(user);
//
// }

// function generateNewUser() {
//   fetchApiCalls('users').then(data => {
//     console.log(data)
//     console.log(user)
//   })
// }

function generateUser() {
  fetchApiCalls('users')
  .then(data => {
    console.log('hola', data.usersData.length);
    const randomUserNum = Math.floor(Math.random() * data.usersData.length);
    let matchingUser = data.usersData.find((item) => {
      if (item.id === randomUserNum) {
        return item;
      }
    })
    user = new User(matchingUser);
    console.log(user);
    pantry = new Pantry(user.pantry)
    populateCards(cookbook.recipes);
    domUpdates.displayGreetUser(user);
  })

  // const randomUserNum = Math.floor(Math.random() * data.length);
  // let matchingUser = data.find((item) => {
  //   if (item.id === randomUserNum) {
  //     return item;
  //   }
  // })
  // user = new User(matchingUser);
  // console.log(user);
}

// YE OLD CRAPPY CODE THANK YOU
// function onStartup() {
//   let userId = (Math.floor(Math.random() * 49) + 1)
//   let newUser = users.find(user => {
//     return user.id === Number(userId);
//   }); // rather than userId === newUser.id
//   user = new User(userId, newUser.name, newUser.pantry)
//   pantry = new Pantry(newUser.pantry)
//   populateCards(cookbook.recipes);
//   greetUser();
// }

// FETCH CALLS
// function generateNewUser() {
//   fetchApiCalls('users').then(data => {
//     console.log(data)
//     console.log('hello')
//   })
// }

function viewFavorites() {
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
function viewRecipesToCook() {
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

function favoriteCard() {
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

function addToCook() {
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

function displayDirections(event) {
    // console.log(user);
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.id)) {
      return recipe;
    }

  })
  let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
  let cost = recipeObject.calculateCost()
  let returnInstructions = recipeObject.retrieveRecipeInstructions();
  let costInDollars = (cost / 100).toFixed(2)
  let returnIngredients = recipeObject.retrieveIngredientName();
  console.log(returnIngredients, returnInstructions);
  // What does it mean "all" ??
  cardArea.classList.add('all');
  cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
  <p class='all-recipe-info'>
  <strong>It will cost: </strong><span class='cost recipe-info'>
  $${costInDollars}</span><br><br>
  <strong>You will need: </strong><span class='ingredients recipe-info'></span>
  <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
  </span></ol>
  </p>`;
  let ingredientsSpan = document.querySelector('.ingredients');
  let instructionsSpan = document.querySelector('.instructions');
  recipeObject.ingredients.forEach(ingredient => {
    ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}</li></ul>
    `)
  })
  recipeObject.instructions.forEach(instruction => {
    instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>
    `)
  })
}


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
