import Menu from './components/menu'
import Filter from './components/filter'
import TripInfo from './components/trip-info'
import {generateEvents, getTotal, getOffers, getDescriptions} from './data'
import {render} from './util'
import Trip from './presenter/trip'

const events = generateEvents(15)
const offers = getOffers()
const descriptions = getDescriptions()
const totalData = getTotal(events)

const tripMainElement = document.querySelector(`.trip-main`)
const mainElement = document.querySelector(`.page-main`)

render(tripMainElement!, new TripInfo(totalData), 'afterbegin')

const tripControlsElement = tripMainElement?.querySelector(`.trip-controls`)
tripControlsElement!.innerHTML = ``
render(tripControlsElement!, new Menu())
render(tripControlsElement!, new Filter())

const tripEventsElement = mainElement?.querySelector(`.trip-events`)
const TripPresenter = new Trip(tripEventsElement!)
TripPresenter.init(events, offers, descriptions)
