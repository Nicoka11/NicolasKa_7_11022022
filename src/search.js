import { store } from "./index.js";
import recipes from "../recipes.js";

export function logSearchParams() {
  console.log(`
Searchbar : ${store.search},
Active filters : ${store.state.selectedFilters
    .map((filter) => filter.name)
    .join(", ")}`);
}

export function filterByInput() {
  const regEx = store.search.length ? new RegExp(`${store.search}`,'gim') : /./g
  console.log(regEx);
    store.state.recipes = recipes.filter((recipe) => recipe.name.match(regEx));
    console.log(store.state.recipes)
}
