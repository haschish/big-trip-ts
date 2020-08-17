import {createElement} from '../util'

export default abstract class View {
  protected element: Element | null = null

  protected abstract getTemplate(): string

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
