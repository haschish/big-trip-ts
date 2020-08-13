import {createElement} from '../util'

const createDaysTemplate = () => (
  `<ul class="trip-days">
  </ul>`
)

export default class Days {
  private element: Element | null = null;

  private getTemlate() {
    return createDaysTemplate()
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
