import Menu from './components/menu'
import Filter from './components/filter'
import Sort from './components/sort'
import Days from './components/days'
import Day from './components/day'
import EventView from './components/event'
import EventFormView from './components/event-form'
import TripInfo from './components/trip-info'
import NoEvents from './components/no-events'
import {generate, getTotal, Point} from './data'
import {renderElement, Position} from './util'

const data = generate(15)
const totalData = getTotal(data)

const renderPoint = (container: Element, point: Point) => {
  const eventView = new EventView(point);
  const eventFormView = new EventFormView(point);

  const onDocumentKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      replaceFormToEvent();
    }
  }

  const replaceEventToForm = () => {
    container.replaceChild(eventFormView.getElement()!, eventView.getElement()!)
    eventView.removeElement();
    document.addEventListener('keydown', onDocumentKeydown)
  }

  const replaceFormToEvent = () => {
    container.replaceChild(eventView.getElement()!, eventFormView.getElement()!)
    eventFormView.removeElement();
    document.addEventListener('keydown', onDocumentKeydown)
  }

  eventView.addClickRollUpListener(() => {
    replaceEventToForm();
  })

  eventFormView.addSubmitListener(() => {
    replaceFormToEvent();
  })

  renderElement(container!, eventView.getElement())
}

const tripMainElement = document.querySelector(`.trip-main`)
const mainElement = document.querySelector(`.page-main`)

renderElement(tripMainElement, new TripInfo(totalData).getElement(), Position.Before)

const tripControlsElement = tripMainElement?.querySelector(`.trip-controls`)
tripControlsElement!.innerHTML = ``
renderElement(tripControlsElement!, new Menu().getElement())
renderElement(tripControlsElement!, new Filter().getElement())

const tripEventsElement = mainElement?.querySelector(`.trip-events`)
if (data.length > 0) {
  renderElement(tripEventsElement!, new Sort().getElement())
  renderElement(tripEventsElement!, new Days().getElement())

  const daysElement = mainElement?.querySelector(`.trip-days`)

  let prevPoint = null
  let counterDay = 0
  let eventListElement = null
  for (const point of data) {
    if (prevPoint === null || point.timeStart.getDate() !== prevPoint.timeStart.getDate()) {
      counterDay += 1
      renderElement(daysElement!, new Day(counterDay, point.timeStart).getElement())
      const dayElement = daysElement?.querySelector('.day:last-child')
      eventListElement = dayElement?.querySelector(`.trip-events__list`)
    }
    prevPoint = point
    renderPoint(eventListElement!, point);
  }
} else {
  renderElement(tripEventsElement!, new NoEvents().getElement())
}
