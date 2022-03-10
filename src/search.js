import { store } from "./index.js";
import recipes from "../recipes.js";

export function logSearchParams() {
  console.log(`
Searchbar : ${store.search},
Active filters : ${store.state.selectedFilters
    .map((filter) => filter.name)
    .join(", ")}`);
  console.log(store.state.selectedFilters);
}

export function filterRecipesByInput() {
  const regEx = store.search.length
    ? new RegExp(`${store.search}`, "gim")
    : /./g;
  store.state.recipes = recipes.filter((recipe) => recipe.name.match(regEx));
}

export function filterByInput(filterSource, dataArray) {
  const regEx = filterSource.length
    ? new RegExp(`${filterSource}`, "gim")
    : /./g;
  return dataArray.filter((data) => data.match(regEx));
}

export function filterByTags(array) {
  let filtering = store.state.recipes;
  array.forEach(({ type, name }) => {
    factory(type, name);
  });

  function factory(type, name) {
    switch (type) {
      case type === "Ingredients":
        filterByIngredient(name);
        break;
      case type === "Appareils":
        filterByAppliance(name);
        break;
      case type === "Ustensiles":
        filterByUstensils(name);
        break;
    }
  }

  function filterByIngredient(name) {
    filtering = filtering.filter((rec) => {
      recipes.ingredients.map((ingObj) => ingObj.ingredient).includes(name);
    });
  }
  function filterByAppliance(name) {
    return 1;
  }
  function filterByUstensils(name) {
    return 1;
  }
}

export function filterByIngredient(name) {
  const regExp = new RegExp(`\\[${name}\\]`, "gim");
  console.log(regExp);
  store.state.filteredByTagRecipes = store.state.recipes.filter((rec) => {
    const ingredients = rec.ingredients
      .map((ingObj) => `[${ingObj.ingredient}]`)
      .join(",");
    return regExp.test(ingredients);
  });
}
