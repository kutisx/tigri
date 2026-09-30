import { UIComponent } from "../core/UIComponent.js";

export class StatsWidget extends UIComponent {
  constructor() {
    super("stats");
    this.stats = [
      { label: "Уровень сонливости", value: 95 },
      { label: "Креативность", value: 78 },
      { label: "3D-моделирование", value: 88 },
      { label: "Дебаг-мастерство", value: 65 },
      { label: "Социальная батарея", value: 20 },
      { label: "Упорство", value: 70 },
    ];
  }

  render() {
    const section = document.createElement("section");
    section.className = "card widget widget--stats";
    section.id = this.id;
    section.innerHTML = `
      <header class="widget__header">
        <h2 class="widget__title">Mastery Chart</h2>
      </header>
      <ul class="stats">
        ${this.stats
          .map(
            (s) => `
          <li class="stat">
            <div class="stat__top">
              <span class="stat__label">${s.label}</span>
              <span class="stat__value">${s.value}/100</span>
            </div>
            <div class="stat__bar" role="progressbar" aria-valuenow="${s.value}" aria-valuemin="0" aria-valuemax="100" aria-label="${s.label}">
              <span class="stat__fill" style="--value: ${s.value}%"></span>
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
    this.element = section;

    requestAnimationFrame(() => {
      this.element?.querySelectorAll(".stat__fill").forEach((el) => {
        el.style.transform = "scaleX(1)";
      });
    });

    return section;
  }

  destroy() {
    this.element?.remove();
    this.element = null;
  }
}