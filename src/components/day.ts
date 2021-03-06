import View from './view'

const createDayTemplate = (counter: number, date: Date | undefined) => {
  const dayCounter = (date) ? counter : ''
  const dayDate = (date) ? date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) : ''

  return `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${dayCounter}</span>
      <time class="day__date" datetime="2019-03-18">${dayDate}</time>
    </div>

    <ul class="trip-events__list">
    </ul>
  </li>`
}

export default class Day extends View {
  constructor(private counter: number = 0, private date?: Date) {
    super()
  }

  protected getTemplate(): string {
    return createDayTemplate(this.counter, this.date)
  }

  getEventsList() {
    return this.element?.querySelector('.trip-events__list')
  }
}
