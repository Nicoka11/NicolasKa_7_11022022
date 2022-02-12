import recipes from "../recipes.js";

import RecipeCard from "./components/RecipeCard.js";
import SearchBar from "./components/SearchBar.js";
import FilterType from "./components/FilterType.js";

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

const filters = ["Ingredients", "Appareils", "Ustensiles"]

const root = document.getElementById("root");
const rootFiltersSelected = document.getElementById("root-filters-selected")
const rootFiltersTypes = document.getElementById("root-filters-types");

filters.forEach(filter => {
    const fragment = document.createElement("filter-type")
    fragment.setAttribute("type", filter);
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
window.customElements.define("filter-type", FilterType)
