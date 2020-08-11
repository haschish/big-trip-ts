import {Point, Offer, getPrepositionForType} from '../data';
import {upperFirst} from '../util'

const getTitle = (point: Point): string => {
  const preposition = getPrepositionForType(point.type)

  return `${upperFirst(point.type)} ${preposition} ${point.destination}`;
}

const getTime = (date: Date): string => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const getDurationTime = (timeStart: Date, timeEnd: Date): string => {
  const duration = timeEnd.getTime() - timeStart.getTime()
  const seconds = duration / 1000
  const minutes = Math.floor(seconds / 60);
  return `${minutes}M`;
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

export const createEventTemplate = (point: Point) => {
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
