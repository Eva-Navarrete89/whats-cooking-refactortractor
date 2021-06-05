class Search {
    constructor() {

    }

    filterRecipeByTag(tag, recipes) {
        return recipes.filter(recipe => {
            return recipe.tags.inclues(tag)
        });
    }
}


export default Search

