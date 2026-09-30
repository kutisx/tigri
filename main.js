import { EventBus } from "./js/core/EventBus.js";
import { Dashboard } from "./js/core/Dashboard.js";
import { CharacterInfoWidget } from "./js/widgets/CharacterInfoWidget.js";
import { QuoteWidget } from "./js/widgets/QuoteWidget.js";
import { StatsWidget } from "./js/widgets/StatsWidget.js";
import { TalentsWidget } from "./js/widgets/TalentsWidget.js";
import { HealthWidget } from "./js/widgets/HealthWidget.js";
import { GifWidget } from "./js/widgets/GifWidget.js";
import { SpaceWidget } from "./js/widgets/SpaceWidget.js";

const eventBus = new EventBus();
const dashboardEl = document.getElementById("dashboard");
const dashboard = new Dashboard(dashboardEl, eventBus);

const character = new CharacterInfoWidget();
const quote = new QuoteWidget(eventBus);
const stats = new StatsWidget();
const talents = new TalentsWidget();
const health = new HealthWidget(eventBus);
const gif = new GifWidget();
const space = new SpaceWidget();

dashboard.addWidget(character);
dashboard.addWidget(quote);
dashboard.addWidget(stats);
dashboard.addWidget(talents);
dashboard.addWidget(health);
dashboard.addWidget(gif);
dashboard.addWidget(space);

const toolbar = document.getElementById("toolbar");

const widgetFactories = {
  character: () => new CharacterInfoWidget(),
  quote: () => new QuoteWidget(eventBus),
  stats: () => new StatsWidget(),
  talents: () => new TalentsWidget(),
  health: () => new HealthWidget(eventBus),
  gif: () => new GifWidget(),
  space: () => new SpaceWidget(),
};

const widgetNames = {
  character: "Персонаж",
  quote: "Цитата",
  stats: "Статы",
  talents: "Таланты",
  health: "HP",
  gif: "Гифка",
  space: "Космос",
};

Object.entries(widgetFactories).forEach(([id, factory]) => {
  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn";
  addBtn.textContent = `+ ${widgetNames[id]}`;
  addBtn.addEventListener("click", () => {
    if (dashboard.getWidget(id)) {
      showToast(`Виджет «${widgetNames[id]}» уже добавлен`);
      return;
    }
    dashboard.addWidget(factory());
  });
  toolbar.appendChild(addBtn);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn btn--danger";
  removeBtn.textContent = `− ${widgetNames[id]}`;
  removeBtn.addEventListener("click", () => {
    if (!dashboard.getWidget(id)) {
      showToast(`Виджета «${widgetNames[id]}» нет`);
      return;
    }
    dashboard.removeWidget(id);
  });
  toolbar.appendChild(removeBtn);
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("toast--visible");

  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2000);
}