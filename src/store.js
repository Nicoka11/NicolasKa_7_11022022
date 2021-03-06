export default class Store {
  constructor(recipes) {
    this.state = {
      search: "",
      recipes: recipes,
      recipesFiltered: recipes,
      // Datasets
      datasets: {
        ingredients: [
          ...new Set(
            recipes
              .map((recipe) => {
                return recipe.ingredients.map((ingr) => ingr.ingredient);
              })
              .flat()
              .map((ingr) => ingr.toLowerCase())
          ),
        ].sort(),
        ingredientsFiltered: [],
        ustensiles: [
          ...new Set(
            recipes
              .map((recipe) => {
                return recipe.ustensils;
              })
              .flat()
          ),
        ].sort(),
        ustensilesFiltered: [],
        appareils: [
          ...new Set(
            recipes.map((recipe) => {
              return recipe.appliance;
            })
          ),
        ].sort(),
        appareilsFiltered: [],
      },
      selectedFilters: [],
    };
    this.resetTags()
  }
  
  resetTags() {
    this.state.datasets.ingredientsFiltered = this.state.datasets.ingredients;
    this.state.datasets.ustensilesFiltered = this.state.datasets.ustensiles;
    this.state.datasets.appareilsFiltered = this.state.datasets.appareils;
  }

  setFilteredTags() {
    this.state.datasets.ingredientsFiltered = [
      ...new Set(
        this.state.recipesFiltered
          .map((recipe) => {
            return recipe.ingredients.map((ingr) => ingr.ingredient);
          })
          .flat()
          .map((ingr) => ingr.toLowerCase())
      ),
    ].sort();
    this.state.datasets.ustensilesFiltered = [
      ...new Set(
        this.state.recipesFiltered
          .map((recipe) => {
            return recipe.ustensils;
          })
          .flat()
      ),
    ].sort();
    this.state.datasets.appareilsFiltered = [
      ...new Set(
        this.state.recipesFiltered.map((recipe) => {
          return recipe.appliance;
        })
      ),
    ].sort();
  }

  getIngredients() {
    return this.state.ingredients;
  }
  getUstensiles() {
    return this.state.ustensiles;
  }
  getAppliance() {
    return this.state.appliance;
  }

  removeSelectedFilters(name) {
    this.state.selectedFilters = this.state.selectedFilters.filter((filter) => {
      return filter.name != name;
    });
  }
  addSelectedFilters(newFilter) {
    this.state.selectedFilters = [...this.state.selectedFilters, newFilter];
  }

  getStoreData(type) {
    return this.state.datasets[type];
  }

  set search(newSearch) {
    this.state.search = newSearch;
  }
  get search() {
    return this.state.search;
  }
}
