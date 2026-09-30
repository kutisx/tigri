import { UIComponent } from "../core/UIComponent.js";

export class CharacterInfoWidget extends UIComponent {
  constructor() {
    super("character");
  }

  render() {
    const section = document.createElement("section");
    section.className = "card widget widget--character";
    section.id = this.id;
    section.innerHTML = `
      <header class="widget__header">
        <h2 class="widget__title">Персонаж</h2>
        <span class="widget__badge">Lv. 99</span>
      </header>
      <div class="character">
        <p class="character__name">Тигри</p>
        <p class="character__roles">Астральный художник / 3D-моделлер / Гейм-дизайнер</p>
        <p class="character__desc">
          Маленький тигрёнок, который постоянно хочет спать, но всё равно делает игры и модели.
          В перерывах между полигонами летает в облаках.
        </p>
      </div>
    `;
    this.element = section;
    return section;
  }

  destroy() {
    this.element?.remove();
    this.element = null;
  }
}