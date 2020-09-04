import Menu from './components/menu'
import TripInfo from './components/trip-info'
import {generateEvents, getTotal, getOffers, getDescriptions} from './data'
import {render} from './util'
import Trip from './presenter/trip'
import FilterPresenter from './presenter/filter'
import PointsModel from './model/points'
import FilterModel from './model/filter'

const events = generateEvents(15)
const offers = getOffers()
const descriptions = getDescriptions()
const totalData = getTotal(events)
const pointsModel = new PointsModel()
pointsModel.setData(events)

const tripMainElement = document.querySelector(`.trip-main`)
const mainElement = document.querySelector(`.page-main`)

render(tripMainElement!, new TripInfo(totalData), 'afterbegin')

const tripControlsElement = tripMainElement?.querySelector(`.trip-controls`)
tripControlsElement!.innerHTML = ``
render(tripControlsElement!, new Menu())

const filterModel = new FilterModel()
const filterPresenter = new FilterPresenter(tripControlsElement!, filterModel)
filterPresenter.init()

const tripEventsElement = mainElement?.querySelector(`.trip-events`)
const TripPresenter = new Trip(tripEventsElement!, pointsModel, filterModel)
TripPresenter.init(offers, descriptions)
