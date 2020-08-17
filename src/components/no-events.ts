import View from './view'

export default class NoEvents extends View {
  protected getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`
  }
}
