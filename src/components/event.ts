import {Point, Offer, getPrepositionForType} from '../data';
import {upperFirst} from '../util'
import SmartView from './smart-view'
import moment from 'moment'

const getTitle = (point: Point): string => {
  const preposition = getPrepositionForType(point.type)

  return `${upperFirst(point.type)} ${preposition} ${point.destination}`;
}

const getTime = (date: Date): string => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const getDurationTime = (timeStart: Date, timeEnd: Date): string => {
  const diff = moment(timeEnd).diff(timeStart);
  const duration = moment.duration(diff);

  const days = duration.days() ? `${duration.days()}D ` : '';
  const hours = duration.hours() ? `${duration.hours()}H ` : '';
  const minutes = duration.minutes() ? `${duration.minutes()}M` : '';

  return `${days}${hours}${minutes}`;
}

const getOffersTemplate = (offers: Offer[]): string => {
  return offers.filter(it => it.checked).slice(0, 3).map(it => `
    <li class="event__offer">
      <span class="event__offer-title">${it.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
    </li>
  `).join('');
}

const createEventTemplate = (point: Point) => {
  const {timeStart, timeEnd} = point;
  const offersTemplate = getOffersTemplate(point.offers);

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${getTitle(point)}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${timeStart.toISOString()}">${getTime(timeStart)}</time>
          &mdash;
          <time class="event__end-time" datetime="${timeEnd.toISOString()}">${getTime(timeEnd)}</time>
        </p>
        <p class="event__duration">${getDurationTime(timeStart, timeEnd)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
}

export default class EventView extends SmartView {
  private listeners: EventListener[] = []

  constructor(private point: Point) {
    super()
    this.onClickRollUp = this.onClickRollUp.bind(this)
  }

  protected getTemplate() {
    return createEventTemplate(this.point)
  }

  protected restoreHadlers() {
    this.element?.querySelector('.event__rollup-btn')?.addEventListener('click', this.onClickRollUp)
  }

  addClickRollUpListener(fn: EventListener) {
    this.listeners.push(fn);
  }

  private onClickRollUp(evt: Event) {
    for (const fn of this.listeners) {
      fn(evt)
    }
  }

  update(newPoint: Point) {
    this.point = newPoint
    this.updateElement()
  }
}
