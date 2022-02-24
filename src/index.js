import recipes from "../recipes.js";

import RecipeCard from "./components/RecipeCard.js";
import SearchBar from "./components/SearchBar.js";
import FilterType from "./components/FilterType.js";
import FilterOption from "./components/FilterOption.js";
import { matchAllString } from "./utils.js";

import Store from "./store.js";

export const store = new Store(recipes);

const root = document.getElementById("root");
const rootFiltersSelected = document.getElementById("root-filters-selected");
const rootFiltersTypes = document.getElementById("root-filters-types");

const filters = [
  { name: "Coco", type: "Ingredients" },
  { name: "Grille Pain", type: "Appareils" },
  { name: "Fourchette", type: "Ustensiles" },
];

filters.forEach((filter) => {
  const fragment = document.createElement("filter-option");
  fragment.setAttribute("name", filter.name);
  fragment.setAttribute("type", filter.type);
  rootFiltersSelected.appendChild(fragment);
});

const filterTypes = ["Ingredients", "Appareils", "Ustensiles"];
filterTypes.forEach((filterType) => {
  const fragment = document.createElement("filter-type");
  fragment.setAttribute("type", filterType);
  rootFiltersTypes.appendChild(fragment);
});

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
window.customElements.define("filter-option", FilterOption);

const testArray = [
  "ail",
  "ananas",
  "banane",
  "bananes",
  "basilic",
  "beurre",
  "beurre fondu",
  "beurre salé",
  "bicarbonate",
  "blanc de dinde",
  "boudoirs",
  "carotte",
  "champignons de paris",
  "chocolat",
  "chocolat au lait",
  "chocolat noir",
  "chocolat noir en pepites",
  "citron",
  "citron vert",
  "concombre",
  "coulis de tomate",
  "coulis de tomates",
  "courgette",
  "crème de coco",
  "crème fraiche",
  "crème fraîche",
  "crème liquide",
  "crême fraîche",
  "cumin",
  "eau",
  "emmental",
  "farine",
  "farine de blé noir",
  "feuilles de laitue",
  "fraise",
  "fromage blanc",
  "fromage de chèvre",
  "fromage à raclette",
  "glace à la vanille",
  "glaçons",
  "gruyère",
  "gruyère râpé",
  "haricots verts",
  "huile d'olive",
  "huile d'olives",
  "jambon de parme",
  "jambon fumé",
  "jus de citron",
  "kiwi",
  "kiwis",
  "lait",
  "lait de coco",
  "lardons",
  "lasagnes",
  "macaronis",
  "mangue",
  "mascarpone",
  "mayonnaise",
  "maïs",
  "maïzena",
  "menthe",
  "miel",
  "moutarde de dijon",
  "mozzarella",
  "mâche",
  "noix",
  "noix de muscade",
  "oeuf",
  "oeuf dur",
  "oignon",
  "olives",
  "orange",
  "oseille",
  "pain",
  "pain de mie",
  "paprika",
  "parmesan",
  "pastèque",
  "patate douce",
  "pennes",
  "petits poids",
  "poireau",
  "poires au jus",
  "pois cassé",
  "pois chiches",
  "poivron rouge",
  "pomme",
  "pommes",
  "pommes de terre",
  "poudre d'amendes",
  "poulet",
  "pruneaux",
  "pâte brisée",
  "pâte feuilletée",
  "pâte sablée",
  "pâte à pizza",
  "rhubarbe",
  "riz blanc",
  "roblochon",
  "salade verte",
];

testArray.filter(string => matchAllString("cuil", string))

var importObject = { imports: { imported_func: arg => console.log(arg) } };
WebAssembly.instantiateStreaming(fetch('../hello.wasm'), importObject).then(obj => obj.instance.exports.exported_func())
// WebAssembly.Module.imports(wasmModule)