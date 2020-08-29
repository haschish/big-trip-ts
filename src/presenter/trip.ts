import {Point, Offer, Description} from '../data'
import PointPresenter from './point'
import Sort, {SortType} from '../components/sort'
import Days from '../components/days'
import Day from '../components/day'
import NoEvents from '../components/no-events'
import {render} from '../util'

export default class Trip {
  private data: Point[] = []
  private offers: Offer[] = []
  private descriptions: Map<string, Description> = new Map()
  private sortView: Sort = new Sort()
  private daysView: Days = new Days()
  private pointPreseters: Map<string, PointPresenter> = new Map()

	constructor(private container: Element) {
    this.onSortChange = this.onSortChange.bind(this)
    this.onUpdatePoint = this.onUpdatePoint.bind(this)
    this.onChangePoint = this.onChangePoint.bind(this)
    this.onPointStartEdit = this.onPointStartEdit.bind(this)
    this.sortView.addChangeListener(this.onSortChange)
  }

  private onSortChange() {
    this.update()
  }

  init(data: Point[], offers: Offer[], descriptions: Map<string, Description>) {
    this.data = data.slice()
    this.offers = offers
    this.descriptions = descriptions

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
        this.data.sort((a, b) => a.timeStart.getTime() - b.timeStart.getTime())
        break
      case SortType.Time:
        this.data.sort((a, b) => (b.timeEnd.getTime() - b.timeStart.getTime()) - (a.timeEnd.getTime() - a.timeStart.getTime()))
        break
      case SortType.Price:
        this.data.sort((a, b) => b.price - a.price)
        break
    }
  }

  private renderPoints(type: string) {
    let dayView: Day = new Day();

    if (type !== SortType.Event) {
      render(this.daysView, dayView)
      for (const point of this.data) {
        this.renderPoint(dayView, point);
      }
    } else {
      let prevPoint: Point | null = null
      let counterDay = 0
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
  }

  private renderNoPoints() {
    render(this.container, new NoEvents())
  }

  private renderPoint(dayView: Day, point: Point) {
    const eventsListElement = dayView.getEventsList()
    const pp = new PointPresenter(eventsListElement!, point, this.onUpdatePoint, this.onChangePoint)
    pp.render()
    pp.addEventListener('startEdit', this.onPointStartEdit)
    this.pointPreseters.set(point.id, pp)
  }

  private onUpdatePoint(newPoint: Point) {
    const index = this.data.findIndex((point) => point.id === newPoint.id)

    this.data = [...this.data.slice(0, index), newPoint, ...this.data.slice(index + 1)]
    this.pointPreseters.get(newPoint.id)?.update(newPoint)
  }

  private onChangePoint(newPoint: Point) {
    const index = this.data.findIndex((point) => point.id === newPoint.id)
    const oldPoint = this.data[index]
    if (newPoint.type !== oldPoint.type) {
      newPoint.offers = this.offers.filter((it) => it.type === newPoint.type)
    }

    if (newPoint.destination !== oldPoint.destination) {
      newPoint.description = this.descriptions.get(newPoint.destination)
    }
    this.pointPreseters.get(newPoint.id)?.updateFormOnly(newPoint)
  }

  private onPointStartEdit() {
    this.pointPreseters.forEach(pp => pp.resetView())
  }
}
