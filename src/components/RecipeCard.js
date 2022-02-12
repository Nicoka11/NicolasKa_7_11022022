class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  _quantityFormatter(quantity, unit) {
    switch (true) {
      case quantity === 1 || quantity === undefined:
        return "";
      case quantity > 0 && unit === ("" || undefined):
        return `: ${quantity}`;
      case quantity > 0 && unit !== ("" || undefined):
        return `: ${quantity}${unit.length > 4 ? " " : ""}${unit}`;
    }
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>
            article {
                display: grid;
                height: 100%;
                grid-template-rows: 1fr 1fr;
                border-radius: 5px;
                overflow: hidden;
            }
            .image-placeholder {
                background-color: #ed6f80;
            } 
            .title {
              font-size: 1.2rem;
            }
            .content {
                background-color: #d43d51;
                padding: .2rem 1rem 2rem;
            }

            .top-content {
                display: flex;
                justify-content: space-between;
            }
          
            .time {
                display: flex;
                align-items: center;
                font-size: 1.25rem;
                font-weight: 700;
              }
              .time-icon {
                margin-right: .4rem;
                display: flex;
              }
            .bottom-content {
              display: flex;

            } 
            .ingredients-list {
              list-style: none;
              padding: 0;
              font-size: 0.8rem;
              flex-basis: 0;
              flex-grow: 1;
            }
            .description {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              font-size: 0.8rem;
              flex-basis: 0;
              flex-grow: 1;
              -webkit-line-clamp: 6;
              overflow: hidden;
            }
        </style>
        <article>
          <div class="image-placeholder">
          </div> 
          <div class="content">
            <div class="top-content">
              <p class="title">${this.recipe.name}</p>
              <div class="time"><span class="time-icon"><img src="static/icons/time.svg"></img></span><p>${
                this.recipe.time
              } min</p></div>
            </div>
            <div class="bottom-content">
              <ul class="ingredients-list">
                ${this.recipe.ingredients
                  .map(({ ingredient, quantity, quantite, unit }) => {
                    if (quantite) quantity = quantite;
                    return /*html*/ `<li><b>${ingredient}</b>${this._quantityFormatter(
                      quantity,
                      unit
                    )}</li>`;
                  })
                  .join("")}
              </ul>
              <p class="description">${this.recipe.description}</p>
            </div>
          </div>
        </article>
      `;
  }
}

export default RecipeCard;
