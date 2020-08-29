import {createElement} from '../util'

export default abstract class View {
  protected element: Element | null = null

  protected abstract getTemplate(): string

  protected createElement() {
    this.element = createElement(this.getTemplate())
  }

  getElement() {
    if (!this.element) {
      this.createElement()
      this.addListeners()
    }
    return this.element
  }

  removeElement() {
    this.removeListeners()
    this.element = null
  }

  protected addListeners() {
  }

  protected removeListeners() {
  }
}
