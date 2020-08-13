import {Point, getPrepositionForType, transferTypes, activityTypes, Offer} from '../data'
import {upperFirst, formatDatetime, getChecked, createElement} from '../util'

const getTypeList = (list: string[], type: string) => {
  return list.map((it) => `
    <div class="event__type-item">
      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}" ${getChecked(type === it)}>
      <label class="event__type-label  event__type-label--${it}" for="event-type-taxi-1">${upperFirst(it)}</label>
    </div>
  `).join('')
}

const getOffersTemplate = (offers: Offer[]) => {
  return offers.map(offer => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${getChecked(offer.checked)}>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `).join('')
}

const getPhotosTemplate = (photos: string[]): string => {
  return photos.map(it => `
    <img class="event__photo" src="${it}" alt="Event photo">
  `).join('')
}

export const createEventFormTemplate = (point: Point) => {
  return `
  <form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${getTypeList(transferTypes, point.type)}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            ${getTypeList(activityTypes, point.type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${upperFirst(point.type)} ${getPrepositionForType(point.type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Saint Petersburg"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDatetime(point.timeStart)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDatetime(point.timeEnd)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>


        <div class="event__available-offers">
          ${getOffersTemplate(point.offers)}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${point.description.text}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${getPhotosTemplate(point.description.pictures)}
          </div>
        </div>
      </section>
    </section>
  </form>`
}

export default class EventFormView {
  private element: Element | null = null;

  constructor(private point: Point) {

  }

  private getTemlate() {
    return createEventFormTemplate(this.point)
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemlate())
    }
    return this.element
  }

  removeElement() {
    this.element = null
  }
}
