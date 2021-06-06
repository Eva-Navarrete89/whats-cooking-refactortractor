import './css/base.scss';
import './css/styles.scss';

import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';
import users from './data/users';
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

window.onload = onStartup();
// window.addEventListener('load', generateNewUser)

// function generateNewUser() {
//   fetchApiCalls('recipes').then(data => {
//     console.log(data)
//     console.log('hello')
//   })
// }

homeButton.addEventListener('click', cardButtonConditionals);
searchButton.addEventListener('click', searchByNameIng);
submitTagsButton.addEventListener('click', searchByFavTags);
favButton.addEventListener('click', viewFavorites);
toCookButton.addEventListener('click', viewToCook);
// This event listener work as a event bubbling
cardArea.addEventListener('click', cardButtonConditionals);

// Functions

function preventDefault() {
  event.preventDefault()
}


function searchByNameIng() {
  preventDefault()
  if (cardArea.classList.contains('all')) {
    const searchText = cookbook.findRecipe(inputSearch.value);
    populateCards(searchText);
    populateCards(tagMatches);
  } else {
    const searchTextFav = user.findFavorites(inputSearch.value);
    populateCards(searchTextFav);
  }


  // if() {
    // const searchText = cookbook.findRecipe(inputSearch.value);
    // populateCards(searchText);
  // } else {
    // const searchTextFav = user.findFavorites(inputSearch.value);
    // populateCards(searchTextFav);
  // }
}








/// Function filter recipes by "TAGS" based on (cookbook.recipes & user.favoriteRecipes)

/// Function filter recipes by "TAGS" based on (cookbook.recipes)
// function searchByTags() {
//   preventDefault()
//   let checkBoxMatches = [];
//   checkBoxes.forEach(checkBox => {
//     if (checkBox.checked) {
//       checkBoxMatches.push(checkBox.value)
//     }
//   })
//   let tagMatches = cookbook.filterRecipesTags(checkBoxMatches);
//   populateCards(tagMatches);
// }



/// Function filter recipes by "TAGS" based on (user.favoriteRecipes)
function searchByFavTags() {
  preventDefault()
  let checkBoxMatches = [];
  checkBoxes.forEach(checkBox => {
    if (checkBox.checked) {
      checkBoxMatches.push(checkBox.value)
    }
  })
// How to say, if the favorite Recipes BTN is active, run user.filterFavorites(checkBoxMatches); ?????
  if (!cardArea.classList.contains('all')) {
    let tagMatches = user.filterFavorites(checkBoxMatches);
    // console.log(tagMatches);
    populateCards(tagMatches);
  } else {
    let tagMatches = cookbook.filterRecipesTags(checkBoxMatches);
    populateCards(tagMatches);
  }

}






function onStartup() {
  generateUser()
  pantry = new Pantry(user.pantry)
  populateCards(cookbook.recipes);
  greetUser();
}

function generateUser() {
  const randomUserNum = Math.floor(Math.random() * users.length);
  let matchingUser = users.find((item) => {
    if (item.id === randomUserNum) {
      return item;
    }
  })
  user = new User(matchingUser);
  console.log(user);
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

//FETCH CALLS
// function generateNewUser() {
//   fetchApiCalls('users').then(data => {
//     console.log(data)
//     console.log('hello')
//   })
// }




// View Favorites and Rec To Cook VIEW & BUTTONS
// These functions will be trigger by event listener in "Button Click"
function viewFavorites(event) {
  event.preventDefault();
  // Is this gonna help the function to run just when we push the buttom ??
  // searchFavByTags();
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
    populateCards(cookbook.recipes);
    return
  } else {
    favButton.innerHTML = 'Refresh Favorites'
    cardArea.innerHTML = '';




    user.favoriteRecipes.forEach(recipe => {
      cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
      class='card'>
      <header id='${recipe.id}' class='card-header'>
      <label for='add-button' class='hidden'>Click to add recipe</label>
      <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
      <img id='${recipe.id}' class='add'
      src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
      recipes to cook'></button>
      <label for='favorite-button' class='hidden'>Click to favorite recipe
      </label>
      <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite-active card-button'>
      </button></header>
      <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
      <img id='${recipe.id}' tabindex='0' class='card-picture'
      src='${recipe.image}' alt='Food from recipe'>
      </div>`)
    })
  }
}




function viewToCook(event) {
  event.preventDefault();
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.recipesToCook.length) {
    toCookButton.innerHTML = 'No Recipes to Cook!';
    populateCards(cookbook.recipes);
    return
  } else {
    favButton.innerHTML = 'Add more recipes'
    cardArea.innerHTML = '';




    user.recipesToCook.forEach(recipe => {
      cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
      class='card'>
      <header id='${recipe.id}' class='card-header'>
      <label for='add-button' class='hidden'>Click to add recipe</label>
      <button id='${recipe.id}' aria-label='add-button' class='add-button '>
      <img id='${recipe.id}' class='add'
      src='https://image.flaticon.com/icons/svg/32/32339.svg' alt='Add to
      recipes to cook'></button>
      <label for='favorite-button' class='hidden'>Click to favorite recipe
      </label>
      <button id='${recipe.id}' aria-label='favorite-button' class='favorite card-button'>
      </button></header>
      <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
      <img id='${recipe.id}' tabindex='0' class='card-picture'
      src='${recipe.image}' alt='Food from recipe'>
      </div>`)
    })
  }
}




/// favoriteCards() & addToCook()
// These functions will be trigger by "cardButtonConditionals()" depending on  "cadrArea TARGET"

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.id)) {
      return recipe;
    }
  })
  if (!event.target.classList.contains('favorite-active')) {
    event.target.classList.add('favorite-active');
    favButton.innerHTML = 'View Favorites';
    user.addToFavorites(specificRecipe);
    console.log(user.favoriteRecipes);
  } else if (event.target.classList.contains('favorite-active')) {
    event.target.classList.remove('favorite-active');
    user.removeFromFavorites(specificRecipe)
    console.log(user.favoriteRecipes);
  }
}


function addToCook(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.id)) {
      return recipe;
    }
  })
  if (event.target.classList.contains('card-button')) {
    event.target.classList.remove('card-button');
    // line down is extra code
    toCookButton.innerHTML = 'Recipes to cook';
    user.addToCookWeek(specificRecipe);
    console.log(user.recipesToCook);
  } else if (!event.target.classList.contains('card-button')) {
    event.target.classList.add('card-button');
    user.removeFromToCook(specificRecipe)
    console.log(user.recipesToCook);
  }
}






function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
  user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
}


function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('add-button')) {
    addToCook(event);
  } else if (event.target.classList.contains('card-picture')) {
    displayDirections(event);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    toCookButton.innerHTML = 'Recipes to cook';
    populateCards(cookbook.recipes);
  }
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
  let costInDollars = (cost / 100).toFixed(2)
  let returnInstructions = recipeObject.retrieveRecipeInstructions();
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
      document.querySelector(`.favorite${recipe.id}`).classList.add('card-button')
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
          <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'>
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
