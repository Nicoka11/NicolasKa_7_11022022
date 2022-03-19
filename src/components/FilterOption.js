import { store, renderSelectedFilters, renderRecipes } from "../index.js";
import filter, { logSearchParams } from "../search.js";
class FilterOption extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.type = this.getAttribute("type");
    this.render();
    this.deleteButton = this.shadowRoot.querySelector(".delete-button");
    this.deleteButton.addEventListener("click", this.onDelete.bind(this));
  }

  onDelete() {
    store.removeSelectedFilters(this.name);
    renderSelectedFilters();
    filter();
    document.querySelectorAll("filter-type").forEach((filterType) => {
      filterType.renderFilters();
    });
    logSearchParams();
    renderRecipes();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
            <style>
                .Ingredients {
                    background-color: #3282F7; 
                }
                .Appareils {
                    background-color: #68D9A4; 
                }
                .Ustensiles {
                    background-color: #ED6454; 
                }
                .container {
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    gap: .4rem;
                    padding: .5rem 1rem;
                    width: max-content;
                    cursor: pointer;
                }
                p {
                    color: white;
                    font-size: .9rem;
                    font-family: inherit;
                    font-weight: 700;
                    margin: 0;
                }
                .delete-button {
                    background: transparent;
                    border: none;
                    outline: none;
                    display: flex;
                    cursor: pointer;
                }
            </style>
            <div class="container ${this.type}">
                <p>${this.name}</p>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                </button>
            </div>
        `;
  }
}

export default FilterOption;
