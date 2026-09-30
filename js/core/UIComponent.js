export class UIComponent {
  constructor(id) {
    if (new.target === UIComponent) {
      throw new Error("UIComponent is abstract");
    }
    this.id = id;
    this.element = null;
  }

  render() {
    throw new Error("render() must be implemented");
  }

  destroy() {
    throw new Error("destroy() must be implemented");
  }
}