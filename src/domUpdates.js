let domUpdates = {
  displayFavorites(currentUser, cardArea, favButton, populateCards, cookbook){
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    if (!currentUser.favoriteRecipes.length) {
      favButton.innerHTML = 'You have no favorites!';
      populateCards(cookbook.recipes);
      return
    } else {
      favButton.innerHTML = 'Refresh Favorites'
      cardArea.innerHTML = '';
      currentUser.favoriteRecipes.forEach(recipe => {
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
  },

  displayRecipesToCook(currentUser, cardArea, toCookButton, populateCards, cookbook){
    event.preventDefault();
    // searchFavByNameIng()
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    if (!currentUser.recipesToCook.length) {
      toCookButton.innerHTML = 'No Recipes to Cook!';
      populateCards(cookbook.recipes);
      return
    } else {
    toCookButton.innerHTML = 'Add more recipes'
    cardArea.innerHTML = '';
    currentUser.recipesToCook.forEach(recipe => {
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
},

  displayGreetUser(user){
    const userName = document.querySelector('.user-name');
    userName.innerHTML =
    user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
  },

  displayFavoriteCard(event, cookbook, favButton, user) {
    let specificRecipe = cookbook.recipes.find(recipe => {
      if (recipe.id  === Number(event.target.id)) {
        return recipe;
      }
    })
    if (!event.target.classList.contains('favorite-active')) {
      event.target.classList.add('favorite-active');
      favButton.innerHTML = 'View Favorites';
      user.addToFavorites(specificRecipe);
    } else if (event.target.classList.contains('favorite-active')) {
      event.target.classList.remove('favorite-active');
      user.removeFromFavorites(specificRecipe)
    }
  },

  addRecipesToCook(event, cookbook, toCookButton, currentUser) {
    let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.id)) {
      return recipe;
      }
    })
    if (event.target.classList.contains('card-button')) {
      event.target.classList.remove('card-button');
      toCookButton.innerHTML = 'Recipes to cook';
      currentUser.addToCookWeek(specificRecipe);
    } else if (!event.target.classList.contains('card-button')) {
      event.target.classList.add('card-button');
      currentUser.removeFromToCook(specificRecipe)
    }
  },

  displayCardDirections(cardArea, recipeObject, costInDollars, returnInstructions,returnIngredients) {
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
    recipeObject.ingredients.forEach(ingredient => {
      ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
      ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
      ${ingredient.name}</li></ul>
      `)
    })

    let instructionsSpan = document.querySelector('.instructions');
    recipeObject.instructions.forEach(instruction => {
      instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
      ${instruction.instruction}</li>
      `)
    })
  },

  displayCardConditionals(event, favoriteCard, favButton, populateCards, cookbook, displayDirections, addToCook) {
    if (event.target.classList.contains('favorite')) {
      favoriteCard(event);
    } else if (event.target.classList.contains('add-button')) {
      addToCook(event);
    } else if (event.target.classList.contains('card-picture')) {
      displayDirections(event);
    } else if (event.target.classList.contains('home')) {
      favButton.innerHTML = 'View Favorites';
      populateCards(cookbook.recipes);
    }
  }

};

export default  domUpdates;
