import {createElement} from '../util'

export default class NoEvents {
  private element: Element | null = null;

  private getTemlate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemlate())
    }
    return this.element
  }

  removeElement() {
    this.element = null
  }
}
