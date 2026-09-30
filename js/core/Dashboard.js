export class Dashboard {
  constructor(container, eventBus) {
    this.container = container;
    this.eventBus = eventBus;
    this.widgets = new Map();
  }

  addWidget(widget) {
    if (this.widgets.has(widget.id)) return;
    const el = widget.render();
    this.container.appendChild(el);
    this.widgets.set(widget.id, widget);
  }

  removeWidget(id) {
    const widget = this.widgets.get(id);
    if (!widget) return;
    widget.destroy();
    this.widgets.delete(id);
  }

  getWidget(id) {
    return this.widgets.get(id);
  }
}