import {Point} from '../data'
import View from '../components/view'
import Sort, {SortType} from '../components/sort'
import Days from '../components/days'
import Day from '../components/day'
import NoEvents from '../components/no-events'
import EventView from '../components/event'
import EventFormView from '../components/event-form'
import {render, replace} from '../util'

export default class Trip {
  private data: Point[] = []
  private sortedData: Point[] = []
  private sortView: Sort = new Sort()
  private daysView: Days = new Days()

	constructor(private container: Element) {
    this.onSortChange = this.onSortChange.bind(this);
    this.sortView.addChangeListener(this.onSortChange)
  }

  private onSortChange() {
    this.update()
  }

  init(data: Point[]) {
    this.data = data.slice()

    this.update()
  }

  private update() {
    this.container.innerHTML = ''
    if (this.data.length > 0) {
      render(this.container, this.sortView)
      render(this.container, this.daysView)
      this.daysView.clear()

      const sortType = this.sortView.getSelected() || SortType.Event
      this.sortData(sortType)
      this.renderPoints(sortType)
    } else {
      this.renderNoPoints()
    }
  }

  private sortData(type: string) {
    switch (type) {
      case SortType.Event:
        this.sortedData = this.data.slice()
        break
      case SortType.Time:
        this.sortedData = this.data.slice().sort((a, b) => (b.timeEnd.getTime() - b.timeStart.getTime()) - (a.timeEnd.getTime() - a.timeStart.getTime()))
        break
      case SortType.Price:
        this.sortedData = this.data.slice().sort((a, b) => b.price - a.price)
        break
    }
  }

  private renderPoints(type: string) {
    let dayView: Day = new Day();

    if (type !== SortType.Event) {
      render(this.daysView, dayView)
      for (const point of this.sortedData) {
        this.renderPoint(dayView, point);
      }
    } else {
      let prevPoint: Point | null = null
      let counterDay = 0
      for (const point of this.sortedData) {
        if (prevPoint === null || point.timeStart.getDate() !== prevPoint.timeStart.getDate()) {
          counterDay += 1
          dayView = new Day(counterDay, point.timeStart)
          render(this.daysView, dayView)
        }
        prevPoint = point
        this.renderPoint(dayView!, point);
      }
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
