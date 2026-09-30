import { UIComponent } from "../core/UIComponent.js";

export class GifWidget extends UIComponent {
  constructor() {
    super("gif");

    this.fallback =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="240" height="320" viewBox="0 0 240 320">
        <rect width="240" height="320" fill="#0b0d12"/>
        <text x="50%" y="45%" fill="#7fd4ff" font-family="sans-serif" font-size="16" text-anchor="middle">Тигри</text>
        <text x="50%" y="55%" fill="#8892a6" font-family="sans-serif" font-size="12" text-anchor="middle">гифка не найдена</text>
      </svg>
    `);
  }

  render() {
    const section = document.createElement("section");
    section.className = "card widget widget--gif";
    section.id = this.id;
    section.innerHTML = `
      <header class="widget__header">
        <h2 class="widget__title">Астральный вид</h2>
      </header>
      <div class="gif">
        <img class="gif__img" src="assets/tigri.gif" alt="Тигри в полный рост" />
      </div>
    `;
    this.element = section;

    const img = this.element.querySelector(".gif__img");
    img.addEventListener("error", () => {
      img.src = this.fallback;
      img.classList.add("gif__img--fallback");
    });

    return section;
  }

  destroy() {
    this.element?.remove();
    this.element = null;
  }
}