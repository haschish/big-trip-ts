import {Total} from '../data'
import {createElement} from '../util'
import View from './view'

const getDateRange = (start: Date, end: Date): string => {
  const optionsStart = { month: 'short', day: 'numeric' };
  const optionsEnd = start.getMonth() !== end.getMonth() ? optionsStart : {day: 'numeric'}
  const from = start.toLocaleDateString('en-US', optionsStart)
  const to = end.toLocaleDateString('en-US', optionsEnd)

  return `${from}&nbsp;&mdash;&nbsp;${to}`;
}


export const createTripInfoTemplate = (data: Total) => {
  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${data.cities.join(' &mdash; ')}</h1>

      <p class="trip-info__dates">${getDateRange(data.dateStart, data.dateEnd)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${data.cost}</span>
    </p>
  </section>`
}

export default class TripInfo extends View {
  constructor(private data: Total) {
    super()
  }

  protected getTemplate() {
    return createTripInfoTemplate(this.data)
  }
}



