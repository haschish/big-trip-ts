import View from './view'

const createDaysTemplate = () => (
  `<ul class="trip-days">
  </ul>`
)

export default class Days extends View {
  protected getTemplate() {
    return createDaysTemplate()
  }
}
