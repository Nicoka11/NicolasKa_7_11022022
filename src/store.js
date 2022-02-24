export default class Store {
  constructor(recipes) {
    this.state = {
      search: "",
      recipes: recipes,
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
        ustensiles: [
          ...new Set(
            recipes
              .map((recipe) => {
                return recipe.ustensils;
              })
              .flat()
          ),
        ].sort(),
        appareils: [
          ...new Set(
            recipes
              .map((recipe) => {
                return recipe.appliance;
              })
              .flat()
          ),
        ].sort(),
      },
    };
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
