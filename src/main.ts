import {createMenuTemplate} from './components/menu'
import {createFilterTemplate} from './components/filter'
import {createSortTemplate} from './components/sort'
import {createDaysTemplate} from './components/days'
import {createDayTemplate} from './components/day'
import {createEventTemplate} from './components/event'
import {createEventFormTemplate} from './components/event-form'
import {createTripInfoTemplate} from './components/trip-info'
import {generate, getTotal} from './data'
import {render} from './util'

const data = generate(15)
const totalData = getTotal(data)

const tripMainElement = document.querySelector(`.trip-main`)
const mainElement = document.querySelector(`.page-main`)

render(tripMainElement, createTripInfoTemplate(totalData), `afterbegin`)

const tripControlsElement = tripMainElement?.querySelector(`.trip-controls`)
tripControlsElement!.innerHTML = ``
render(tripControlsElement, createMenuTemplate())
render(tripControlsElement, createFilterTemplate())

const tripEventsElement = mainElement?.querySelector(`.trip-events`)
render(tripEventsElement, createSortTemplate())
render(tripEventsElement, createEventFormTemplate(data[0]))
render(tripEventsElement, createDaysTemplate())

const daysElement = mainElement?.querySelector(`.trip-days`)

let prevPoint = null
let counterDay = 0
let eventListElement = null
for (const point of data) {
  if (prevPoint === null || point.timeStart.getDate() !== prevPoint.timeStart.getDate()) {
    counterDay += 1
    render(daysElement, createDayTemplate(counterDay, point.timeStart))
    const dayElement = daysElement?.querySelector('.day:last-child')
    eventListElement = dayElement?.querySelector(`.trip-events__list`)
  }
  prevPoint = point
  render(eventListElement, createEventTemplate(point))
}
