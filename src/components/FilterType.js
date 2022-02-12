class FilterType extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.type = this.getAttribute("type");
    this.isFocused = false;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet">  
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
                align-items: center;
                cursor: pointer;
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

            .chevron {
                display: flex;
            } 
            
            .chevron-active svg {
                transform: rotate(0);
                transition: transform .3s ease;
            }

            .chevron-active svg {
                transform: rotate(180deg);
                transition: transform .3s ease;
            }
        </style>
        <div class="filter ${this.type}">
            <input type="text" placeholder="${this.type}"/>
            <div class="chevron">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="#ffffff"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
            </div>
        </div>
        `;
  }
}

export default FilterType;
