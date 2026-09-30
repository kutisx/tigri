import { UIComponent } from "../core/UIComponent.js";

export class QuoteWidget extends UIComponent {
  constructor(eventBus) {
    super("quote");
    this.eventBus = eventBus;
    this.unsubscribe = null;

    this.quotes = {
      sad: [
        "Я не сплю. Я просто медитирую с закрытыми глазами. Уже третий час.",
        "Нет, я не выгорел. Я просто в астрале.",
        "Все соединены... но я всё равно не понимаю, что происходит.",
      ],
      neutral: [
        "Ещё пять минут... или пять лет, я не считала.",
        "Мой уровень энергии: 1%. Мой уровень желания что-то делать: 0%.",
        "Я в сети. Или сеть во мне?",
      ],
      happy: [
        "Сон — это не лень. Это перезагрузка перед очередным багом.",
        "Я в астрале. Если что-то нужно — оставьте сообщение после гудка.",
        "Полигоны сами себя не отредачиют!",
      ],
    };
  }

  pickQuote(hp) {
    let mood = "neutral";
    if (hp < 30) mood = "sad";
    else if (hp > 70) mood = "happy";

    const list = this.quotes[mood];
    const quote = list[Math.floor(Math.random() * list.length)];
    return { mood, quote };
  }

  updateMood(hp) {
    if (!this.element) return;

    const { mood, quote } = this.pickQuote(hp);
    const quoteEl = this.element.querySelector(".quote__text");
    const moodEl = this.element.querySelector(".quote__mood");

    quoteEl.textContent = `«${quote}»`;
    moodEl.textContent =
      mood === "sad" ? "грустное" : mood === "happy" ? "весёлое" : "нейтральное";

    this.element.dataset.mood = mood;
  }

  render() {
    const section = document.createElement("section");
    section.className = "card widget widget--quote";
    section.id = this.id;
    section.innerHTML = `
      <header class="widget__header">
        <h2 class="widget__title">Мысли в астрале</h2>
        <span class="quote__mood">нейтральное</span>
      </header>
      <blockquote class="quote">
        <p class="quote__text">«Я в сети. Или сеть во мне?»</p>
      </blockquote>
    `;
    this.element = section;

    this.unsubscribe = this.eventBus.on("hp:change", (hp) => this.updateMood(hp));
    this.updateMood(100);

    return section;
  }

  destroy() {
    this.unsubscribe?.();
    this.element?.remove();
    this.element = null;
  }
}