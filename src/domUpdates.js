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

  displayCardConditionals(event, favoriteCard, favButton, populateCards, cookbook, displayDirections) {
    if (event.target.classList.contains('favorite')) {
      favoriteCard(event);
    } else if (event.target.classList.contains('card-picture')) {
      displayDirections(event);
    } else if (event.target.classList.contains('home')) {
      favButton.innerHTML = 'View Favorites';
      populateCards(cookbook.recipes);
    }
  }

};

export default  domUpdates;
