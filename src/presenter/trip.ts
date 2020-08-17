import {Point} from '../data'
import View from '../components/view'
import Sort from '../components/sort'
import Days from '../components/days'
import Day from '../components/day'
import NoEvents from '../components/no-events'
import EventView from '../components/event'
import EventFormView from '../components/event-form'
import {render, replace} from '../util'

export default class Trip {
  private data: Point[] = []
  private sortView: Sort = new Sort()
  private daysView: Days = new Days()
	constructor(private container: Element) {

  }

  init(data: Point[]) {
    this.data = data.slice()

    if (data.length > 0) {
      this.renderPoints()
    } else {
      this.renderNoPoints()
    }
  }

  private renderPoints() {
    render(this.container, this.sortView)
    render(this.container, this.daysView)

    let prevPoint = null
    let counterDay = 0
    let dayView: Day | null = null
    for (const point of this.data) {
      if (prevPoint === null || point.timeStart.getDate() !== prevPoint.timeStart.getDate()) {
        counterDay += 1
        dayView = new Day(counterDay, point.timeStart)
        render(this.daysView, dayView)
      }
      prevPoint = point
      this.renderPoint(dayView!, point);
    }
  }

  private renderNoPoints() {
    render(this.container, new NoEvents())
  }

  private renderPoint(dayView: Day, point: Point) {
    const eventView = new EventView(point);
    const eventFormView = new EventFormView(point);
    const eventsListElement = dayView.getEventsList()

    const onDocumentKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        replaceFormToEvent();
      }
    }

    const replaceEventToForm = () => {
      replace(eventsListElement!, eventFormView, eventView)
      eventView.removeElement();
      document.addEventListener('keydown', onDocumentKeydown)
    }

    const replaceFormToEvent = () => {
      replace(eventsListElement!, eventView, eventFormView)
      eventFormView.removeElement();
      document.removeEventListener('keydown', onDocumentKeydown)
    }

    eventView.addClickRollUpListener(() => {
      replaceEventToForm();
    })

    eventFormView.addSubmitListener(() => {
      replaceFormToEvent();
    })

    render(eventsListElement!, eventView)
  }
}
