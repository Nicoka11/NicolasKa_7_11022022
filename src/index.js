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

function renderFilterTypes() {
  rootFiltersTypes.innerHTML = "";
  filterTypes.forEach((filterType) => {
    const fragment = document.createElement("filter-type");
    fragment.setAttribute("type", filterType);
    rootFiltersTypes.appendChild(fragment);
  })
};

export function renderRecipes() {
  root.innerHTML = "";
  if (!store.state.filteredRecipes.length) {
    root.innerHTML = /*html*/ `
    <style>
      p {
        color: #C7BEBE;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 1rem auto;
      }
      </style>
      <div>
      <p>Aucune recette à afficher</p>
      </div>
      `;
    return;
  }
  store.state.filteredRecipes.forEach((recipe) => {
    const fragment = document.createElement("recipe-card");
    fragment.setAttribute("id", recipe.id);
    fragment.recipe = recipe;
    root.appendChild(fragment);
  });
}

function init() {
  renderFilterTypes();
  renderRecipes();
}
init();

window.customElements.define("recipe-card", RecipeCard);
window.customElements.define("search-bar", SearchBar);
window.customElements.define("filter-type", FilterType);
window.customElements.define("filter-option", FilterOption);
