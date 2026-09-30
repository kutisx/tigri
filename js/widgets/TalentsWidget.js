import { UIComponent } from "../core/UIComponent.js";

export class TalentsWidget extends UIComponent {
  constructor() {
    super("talents");
    this.talents = [
      {
        name: "Полиморфизм сознания",
        level: 5,
        desc: "Позволяет притворяться, что всё понимаешь, даже когда нет.",
      },
      {
        name: "Инкапсуляция мыслей",
        level: 3,
        desc: "Скрывает внутреннюю панику от окружающих.",
      },
      {
        name: "Наследование лени",
        level: 99,
        desc: "Передаёт состояние «ничего не хочу» всем потомкам.",
      },
      {
        name: "Перегрузка оператора сна",
        level: 4,
        desc: "Позволяет спать в любых условиях.",
      },
    ];
  }

  render() {
    const section = document.createElement("section");
    section.className = "card widget widget--talents";
    section.id = this.id;
    section.innerHTML = `
      <header class="widget__header">
        <h2 class="widget__title">Таланты и прокачка</h2>
      </header>
      <ul class="talents">
        ${this.talents
          .map(
            (t) => `
          <li class="talent">
            <div class="talent__head">
              <span class="talent__name">${t.name}</span>
              <span class="talent__level">Ур. ${t.level}</span>
            </div>
            <p class="talent__desc">${t.desc}</p>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
    this.element = section;
    return section;
  }

  destroy() {
    this.element?.remove();
    this.element = null;
  }
}