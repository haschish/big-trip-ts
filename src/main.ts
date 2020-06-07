import {createMenuTemplate} from './components/menu'
import {createFilterTemplate} from './components/filter'
import {createSortTemplate} from './components/sort'
import {createDaysTemplate} from './components/days'
import {createDayTemplate} from './components/day'
import {createEventTemplate} from './components/event'
import {createEventFormTemplate} from './components/event-form'
import {createTripInfoTemplate} from './components/trip-info'


const render = (container: Element | null | undefined, template: string, place: InsertPosition = `beforeend` ) => {
  container?.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const mainElement = document.querySelector(`.page-main`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripControlsElement = tripMainElement?.querySelector(`.trip-controls`);
tripControlsElement!.innerHTML = ``;
render(tripControlsElement, createMenuTemplate());
render(tripControlsElement, createFilterTemplate());

const tripEventsElement = mainElement?.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEventFormTemplate());
render(tripEventsElement, createDaysTemplate());

const daysElement = mainElement?.querySelector(`.trip-days`);
render(daysElement, createDayTemplate());

const eventListElement = daysElement?.querySelector(`.trip-events__list`);
for (let i = 0; i < 3; i++) {
  render(eventListElement, createEventTemplate());
}

