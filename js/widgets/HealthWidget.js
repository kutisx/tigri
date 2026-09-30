import { UIComponent } from "../core/UIComponent.js";

export class HealthWidget extends UIComponent {
  constructor(eventBus) {
    super("health");
    this.eventBus = eventBus;
    this.hp = 100;
    this.maxHp = 100;
    this.timer = null;
    this.abortController = null;
  }

  async fetchHp() {
    this.abortController?.abort();
    this.abortController = new AbortController();

    let hp = Math.floor(Math.random() * 100) + 1;

    try {
      const res = await fetch(
        "https://api.tinyfn.io/v1/random/number?min=1&max=100",
        { signal: this.abortController.signal }
      );

      if (res.ok) {
        const data = await res.json();
        const value =
          typeof data === "number"
            ? data
            : data.number ?? data.value ?? data.random;

        if (typeof value === "number" && value >= 1 && value <= 100) {
          hp = Math.round(value);
        }
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        console.warn("HP API failed, using random", e);
      }
    }

    this.setHp(hp);
  }

  setHp(hp) {
    this.hp = Math.min(this.maxHp, Math.max(0, Math.round(hp)));
    this.updateUI();
    this.eventBus.emit("hp:change", this.hp);
  }

  updateUI() {
    if (!this.element) return;

    const hpEl = this.element.querySelector(".health__value");
    const fill = this.element.querySelector(".health__fill");
    const stateEl = this.element.querySelector(".health__state");
    const bar = this.element.querySelector(".health__bar");

    if (hpEl) hpEl.textContent = `${this.hp}/${this.maxHp}`;
    if (fill) fill.style.width = `${(this.hp / this.maxHp) * 100}%`;
    if (bar) bar.setAttribute("aria-valuenow", String(this.hp));

    let state = "стабильно";
    if (this.hp < 30) state = "критически мало";
    else if (this.hp < 60) state = "на грани";
    else if (this.hp > 90) state = "переполнен";

    if (stateEl) stateEl.textContent = state;
  }

  render() {
    const section = document.createElement("section");
    section.className = "card widget widget--health";
    section.id = this.id;
    section.innerHTML = `
      <header class="widget__header">
        <h2 class="widget__title">Жизненные показатели</h2>
        <span class="health__state">стабильно</span>
      </header>
      <div class="health">
        <div class="health__heart" aria-hidden="true">❤</div>
        <div class="health__info">
          <p class="health__value">100/100</p>
          <div class="health__bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" aria-label="Здоровье">
            <span class="health__fill" style="width: 100%"></span>
          </div>
        </div>
      </div>
      <button class="btn btn--ghost health__refresh" type="button">Обновить HP</button>
    `;
    this.element = section;

    this.element
      .querySelector(".health__refresh")
      .addEventListener("click", () => this.fetchHp());

    this.fetchHp();
    this.timer = setInterval(() => this.fetchHp(), 30000);

    return section;
  }

  destroy() {
    clearInterval(this.timer);
    this.abortController?.abort();
    this.element?.remove();
    this.element = null;
  }
}