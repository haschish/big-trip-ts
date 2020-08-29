import View from './view'

export default abstract class SmartView extends View {
  protected abstract restoreHadlers(): void

  getElement() {
    if (!this.element) {
      this.createElement()
      this.restoreHadlers()
    }
    return this.element
  }

  protected updateElement() {
    if (this.element) {
      const oldElement = this.element
      const parentElement = this.element.parentElement
      this.removeElement()
      parentElement!.replaceChild(this.getElement()!, oldElement)
    }
  }
}
