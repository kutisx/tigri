import { UIComponent } from "../core/UIComponent.js";

export class SpaceWidget extends UIComponent {
  constructor() {
    super("space");
    this.abortController = null;
  }

  async loadApod() {
    this.abortController?.abort();
    this.abortController = new AbortController();

    const content = this.element?.querySelector(".space__content");
    if (!content) return;

    content.innerHTML = `<p class="space__loading">Сканирую астрал...</p>`;

    try {
      const res = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1",
        { signal: this.abortController.signal }
      );

      if (!res.ok) throw new Error("NASA API error");

      const data = await res.json();
      const item = Array.isArray(data) ? data[0] : data;
      if (!item) throw new Error("Пустой ответ");

      const isImage = item.media_type === "image";

      content.innerHTML = `
        ${
          isImage
            ? `<img class="space__img" src="${item.url}" alt="${item.title || "Космос"}" loading="lazy" />`
            : `<a class="space__link" href="${item.url}" target="_blank" rel="noopener">${item.title || "Видео NASA"}</a>`
        }
        <p class="space__title">${item.title || ""}</p>
        <p class="space__desc">
          ${(item.explanation || "").slice(0, 180)}${
            (item.explanation || "").length > 180 ? "…" : ""
          }
        </p>
      `;
    } catch (e) {
      if (e.name === "AbortError") return;
      content.innerHTML = `<p class="space__error">Не удалось связаться с космосом. Попробуй ещё раз.</p>`;
    }
  }

  render() {
    const section = document.createElement("section");
    section.className = "card widget widget--space";
    section.id = this.id;
    section.innerHTML = `
      <header class="widget__header">
        <h2 class="widget__title">Космический фон</h2>
        <button class="btn btn--ghost space__refresh" type="button">Ещё космос</button>
      </header>
      <div class="space__content">
        <p class="space__loading">Сканирую астрал...</p>
      </div>
    `;
    this.element = section;

    this.element
      .querySelector(".space__refresh")
      .addEventListener("click", () => this.loadApod());

    this.loadApod();
    return section;
  }

  destroy() {
    this.abortController?.abort();
    this.element?.remove();
    this.element = null;
  }
}