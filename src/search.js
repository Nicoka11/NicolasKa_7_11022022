import { store } from "./index.js";
import recipes from "../recipes.js";

export function logSearchParams() {
  console.log(`
Searchbar : ${store.search},
Active filters : ${store.state.selectedFilters
    .map((filter) => filter.name)
    .join(", ")}`);
}

export default function filter() {
  store.state.selectedFilters.length
    ? filterByTags()
    : (store.state.filteredRecipes = recipes);
  const regEx = store.search.length
    ? new RegExp(`${store.search}`, "gim")
    : /./g;
  store.state.filteredRecipes = store.state.filteredRecipes.filter((recipe) =>
    regEx.test(recipe.name)
  );
}

export function filterByInput(filterSource, dataArray) {
  const regEx = filterSource.length
    ? new RegExp(`${filterSource}`, "gim")
    : /./g;
  return dataArray.filter((data) => data.match(regEx));
}

export function filterByTags() {
  let filtering = recipes;
  store.state.selectedFilters.forEach(({ type, name }) => {
    factory(type, name);
  });
  store.state.filteredRecipes = filtering;

  function factory(type, name) {
    switch (true) {
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
    const regExp = new RegExp(`\\[${name}\\]`, "gim");
    filtering = filtering.filter((rec) => {
      const ingredients = rec.ingredients
        .map((ingObj) => `[${ingObj.ingredient}]`)
        .join(",");
      return regExp.test(ingredients);
    });
  }

  function filterByAppliance(name) {
    const regExp = new RegExp(`${name}`, "gim");
    filtering = filtering.filter((rec) => {
      return regExp.test(rec.appliance);
    });
  }
  function filterByUstensils(name) {
    const regExp = new RegExp(`\\[${name}\\]`, "gim");
    filtering = filtering.filter((rec) => {
      const ustensils = rec.ustensils
        .map((ustensil) => `[${ustensil}]`)
        .join(",");
      return regExp.test(ustensils);
    });
  }
}
