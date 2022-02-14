import recipes from "../recipes.js";

import RecipeCard from "./components/RecipeCard.js";
import SearchBar from "./components/SearchBar.js";
import FilterType from "./components/FilterType.js";
import FilterOption from "./components/FilterOption.js"

import Store from "./store.js"


export const store = new Store;

const root = document.getElementById("root");
const rootFiltersSelected = document.getElementById("root-filters-selected")
const rootFiltersTypes = document.getElementById("root-filters-types");


// Datasets
const ingredients = [
  ...new Set(
    recipes
      .map((recipe) => {
        return recipe.ingredients.map((ingr) => ingr.ingredient);
      })
      .flat()
      .map((ingr) => ingr.toLowerCase())
  ),
];
const ustensils = [
  ...new Set(
    recipes
      .map((recipe) => {
        return recipe.ustensils;
      })
      .flat()
  ),
];
const appliance = [
  ...new Set(
    recipes
      .map((recipe) => {
        return recipe.appliance;
      })
      .flat()
  ),
];

const filters = [{ name: "Coco", type: "Ingredients" }, { name: "Grille Pain", type: "Appareils" }, { name: "Fourchette", type: "Ustensiles" }]

filters.forEach((filter) => {
  const fragment = document.createElement("filter-option");
  fragment.setAttribute("name", filter.name)
  fragment.setAttribute("type", filter.type)
  rootFiltersSelected.appendChild(fragment)
})


const filterTypes = ["Ingredients", "Appareils", "Ustensiles"]
  filterTypes.forEach(filterType => {
    const fragment = document.createElement("filter-type")
    fragment.setAttribute("type", filterType);
    rootFiltersTypes.appendChild(fragment)
})

function renderRecipes() {
  recipes.forEach((recipe) => {
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
window.customElements.define("filter-option", FilterOption)
