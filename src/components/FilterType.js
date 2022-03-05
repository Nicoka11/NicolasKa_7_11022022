import { store, renderSelectedFilters } from "../index.js";
import { filterByInput, logSearchParams } from "../search.js";
class FilterType extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.type = this.getAttribute("type");
    this.filters = store.getStoreData(this.type.toLowerCase());
    this.inputFilter = "";
    this.render();
    //Elements
    this.filterEl = this.shadowRoot.querySelector(".filter");
    this.input = this.shadowRoot.querySelector("input");
  }

  onFocus() {
    const wasElementinFocus = this.shadowRoot.querySelector(".filter-grid").classList.contains("active");
    document.querySelectorAll("filter-type").forEach((el) => {
      el.shadowRoot.querySelector(".filter-grid").classList.remove("active");
      el.shadowRoot
        .querySelector(".chevron")
        .classList.remove("chevron-active");
      el.shadowRoot.querySelector("input").blur();
      el.input.value = "";
      el.inputFilter = "";
    });
    if (wasElementinFocus) return;

    this.shadowRoot.querySelector(".filter-grid").classList.add("active");
    this.shadowRoot.querySelector(".chevron").classList.add("chevron-active");
    this.input.focus();
  }

  onInputChange(e) {
    this.inputFilter = e.target.value;
    this.filters = filterByInput(this.inputFilter, store.getStoreData(this.type.toLowerCase()));
    this.shadowRoot.querySelector(".filter-grid").innerHTML = this.renderFilters();
  }

  addFilter(e) {
    store.addSelectedFilters({ type: this.type, name: e.target.innerHTML });
    logSearchParams();
    renderSelectedFilters();
  }

  connectedCallback() {
    this.attachEvents();
  }

  attachEvents() {
    this.filterEl.addEventListener("click", this.onFocus.bind(this));
    this.shadowRoot
      .querySelector(".filter-grid")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-item")) {
          this.addFilter(e);
        }
      });
    this.input.addEventListener("input", (e) => this.onInputChange(e));
  }
  removeEvents() {
    this.filterEl.removeEventListener("click", this.onFocus);
    this.shadowRoot
      .querySelector(".filter-grid")
      .removeEventListener("click", (e) => {
        if (e.target.classList.contains("filter-item")) {
          this.addFilter(e);
        }
      });
  }

  renderFilters() {
    return this.filters
    .map(
      (item) =>
        /*html*/ `<button class="filter-item">${item}</button>`
    )
    .join("")
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
            .filter {
                padding: 1.2rem .5rem;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                align-items: left;
                cursor: pointer;
                transition: height .2s ease;
            }
            .initial {
                display: flex;
                justify-content: space-between;
            }
            input {
                background: transparent;
                outline: none;
                border: none;
                font: inherit;
                width: 8rem;
                color: white;
                font-weight: 700;
            }
            input::placeholder {
                color: white;
                opacity: 1;
                font-weight: 700;
            }
            input:focus::placeholder {
                color: white;
                opacity: .5;
                font-weight: 700;
            }

            .chevron {
                display: flex;
            } 
            
            .chevron svg {
                transform: rotate(0);
                transition: transform .3s ease;
            }

            .chevron-active svg {
                transform: rotate(180deg);
                transition: transform .3s ease;
            }
            .filter-item {
                background: none;
                outline: none;
                border: none;
                color: white;
                font-size: .9rem;
                cursor: pointer;
                text-align: left;
                transition: color .3s ease;
            }

            .filter-item:hover, .filter-item:active {
                color: black;
            }

            .filter-grid {
                margin-top: 1.5rem;
                display:none;
                grid-template-columns: repeat(3, 1fr);
                place-items: start;
                gap: .5rem;
            }

            .active {
              display: grid
            }
        </style>
        <div class="filter ${this.type}">
            <div class="initial">
                <input type="text" placeholder="${this.type}"/>
                <div class="chevron">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="#ffffff"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
                </div>
            </div>
            <div class="filter-grid">
                    ${this.renderFilters()}
                </div>
            </div>
        `;
  }
}

export default FilterType;
