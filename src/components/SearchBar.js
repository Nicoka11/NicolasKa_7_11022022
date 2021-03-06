import { renderRecipes, store } from "../index.js";
import filter, { logSearchParams } from "../search.js";
class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.container = this.shadowRoot.querySelector(".container");
    this.input = this.shadowRoot.querySelector("#searchbar-input");
  }

  onClickSearch() {
    this.input.focus();
  }

  onInputChange(e) {
    store.search = e.target.value;
    filter();
    renderRecipes();
    logSearchParams();
    document.querySelectorAll("filter-type").forEach((filterType) => {
      filterType.renderFilters();
    });
  }

  connectedCallback() {
    this.container.addEventListener("click", () => this.onClickSearch());
    this.input.addEventListener("input", (e) => this.onInputChange(e));
  }

  disconnectedCallback() {
    this.container.removeEventListener("click", this.onClickSearch);
    this.input.removeEventListener("input", this.onInputChange);
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>
            :host {
                display: block;
            }

            .container {
                background: #E7E7E7;
                padding: .5rem .8rem .5rem 1.1rem;
                border-radius: 5px;
                cursor: text;
                transition: all .3s;
              }
              .container:hover {
                background: #D3D3D3;
                
              }
              .container:focus-within {
                background: #D3D3D3;
              }
            form {
                display:flex;
                align-items: center;
                justify-content: space-between;
            }

            input {
                background: transparent;
                outline: none;
                border: none;
                font: inherit;
                width: 100%;
            }
            
            button {
                background: transparent;
                outline: none;
                border: none;
                cursor: pointer;
            }
        </style>
        <div class="container">
        <form>
            <input id="searchbar-input" type="text" placeholder="Rechercher une recette"/>
            <button>
              <img src="static/icons/search.svg" alt="" />
            </button>
        </form>
        </div>
        `;
  }
}

export default SearchBar;
