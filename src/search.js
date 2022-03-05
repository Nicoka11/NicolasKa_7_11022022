import { store } from "./index.js";
import recipes from "../recipes.js";

export function logSearchParams() {
  console.log(`
Searchbar : ${store.search},
Active filters : ${store.state.selectedFilters
    .map((filter) => filter.name)
    .join(", ")}`);
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
