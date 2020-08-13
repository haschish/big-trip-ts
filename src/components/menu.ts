import {createElement} from '../util'

const createMenuTemplate = () => `
  <div>
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  </div>`

export default class Menu {
  private element: Element | null = null;

  private getTemplate() {
    return createMenuTemplate()
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate())
    }
    return this.element
  }

  removeElement() {
    this.element = null
  }
}
