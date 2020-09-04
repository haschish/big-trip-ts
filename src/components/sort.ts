import SmartView from './smart-view'
import {getChecked} from '../util'

export enum SortType {
  Event = 'sort-event',
  Time = 'sort-time',
  Price = 'sort-price'
}

const createSortTemplate = (currectSort: string) => {

  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.Event}" ${getChecked(currectSort === SortType.Event)}>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.Time}" ${getChecked(currectSort === SortType.Time)}>
      <label class="trip-sort__btn" for="sort-time">
        Time
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.Price}" ${getChecked(currectSort === SortType.Price)}>
      <label class="trip-sort__btn" for="sort-price">
        Price
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`
}

export default class Sort extends SmartView {
  constructor (private sort: string) {
    super()
    this.onChange = this.onChange.bind(this)
  }

  protected getTemplate() {
    return createSortTemplate(this.sort)
  }

  protected restoreHadlers() {
    this.element!.addEventListener('change', this.onChange)
  }

  private onChange(evt: Event) {
    this.dispatchEvent(new Event('change'))
  }

  getSelected() {
    if (this.element) {
      return (<HTMLInputElement>this.element!.querySelector('input:checked')).value
    }
    return null
  }

  update(value: string) {
    this.sort = value
    this.updateElement()
  }
}
