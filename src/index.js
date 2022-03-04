import recipes from "../recipes.js";

import RecipeCard from "./components/RecipeCard.js";
import SearchBar from "./components/SearchBar.js";
import FilterType from "./components/FilterType.js";
import FilterOption from "./components/FilterOption.js";

import Store from "./store.js";

export const store = new Store(recipes);

const root = document.getElementById("root");
const rootFiltersSelected = document.getElementById("root-filters-selected");
const rootFiltersTypes = document.getElementById("root-filters-types");

const filterTypes = ["Ingredients", "Appareils", "Ustensiles"];

export function renderSelectedFilters() {
  rootFiltersSelected.innerHTML = "";
  store.state.selectedFilters.forEach((filter) => {
    const fragment = document.createElement("filter-option");
    fragment.setAttribute("name", filter.name);
    fragment.setAttribute("type", filter.type);
    rootFiltersSelected.appendChild(fragment);
  });
}
renderSelectedFilters();

export function renderFilterTypes() {
  rootFiltersTypes.innerHTML = "";
  filterTypes.forEach((filterType) => {
    const fragment = document.createElement("filter-type");
    fragment.setAttribute("type", filterType);
    rootFiltersTypes.appendChild(fragment);
  });
}
renderFilterTypes();

export function renderRecipes() {
  root.innerHTML = "";
  console.log("Coming from the renderRecipes function", store.state.recipes);
  store.state.recipes.forEach((recipe) => {
    console.log("Current Recipe : " + recipe);
    const fragment = document.createElement("recipe-card");
    fragment.setAttribute("id", recipe.id);
    fragment.recipe = recipe;
    root.appendChild(fragment);
  });
}
renderRecipes();

window.customElements.define("recipe-card", RecipeCard);
window.customElements.define("search-bar", SearchBar);
window.customElements.define("filter-type", FilterType);
window.customElements.define("filter-option", FilterOption);
