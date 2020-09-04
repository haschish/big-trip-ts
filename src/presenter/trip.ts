import {Point, Offer, Description, Actions} from '../data'
import PointPresenter from './point'
import Sort, {SortType} from '../components/sort'
import {FilterType} from '../components/filter'
import Days from '../components/days'
import Day from '../components/day'
import NoEvents from '../components/no-events'
import {render} from '../util'
import PointsModel from '../model/points'
import FilterModel from '../model/filter'

export default class Trip {
  private offers: Offer[] = []
  private descriptions: Map<string, Description> = new Map()
  private sortView: Sort
  private daysView: Days = new Days()
  private pointPreseters: Map<string, PointPresenter> = new Map()
  private sort: string = SortType.Event

	constructor(private container: Element, private model: PointsModel, private filterModel: FilterModel) {
    this.sortView = new Sort(this.sort)
    this.onSortChange = this.onSortChange.bind(this)
    this.onUpdatePoint = this.onUpdatePoint.bind(this)
    this.onChangePoint = this.onChangePoint.bind(this)
    this.onPointStartEdit = this.onPointStartEdit.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)

    this.sortView.addEventListener('change', this.onSortChange)
    this.filterModel.addEventListener('change', this.onFilterChange)
  }

  private onSortChange() {
    this.sort = this.sortView.getSelected()!
    console.log(this.sort)
    this.update()
  }

  init(offers: Offer[], descriptions: Map<string, Description>) {
    this.offers = offers
    this.descriptions = descriptions

    this.update()
  }

  private update() {
    this.container.innerHTML = ''
    const data = this.getFilteredData()
    if (data.length > 0) {
      render(this.container, this.sortView)
      render(this.container, this.daysView)
      this.daysView.clear()
      this.model.sort(this.sort)
      this.renderPoints(data)
    } else {
      this.renderNoPoints()
    }
  }

  private getFilteredData() {
    let fn = (it: Point) => true
    const now = Date.now()
    switch(this.filterModel.get()) {
      case FilterType.Everything:
        fn = () => true
        break
      case FilterType.Future:
        fn = (it) => it.timeStart.getTime() > now
        break
      case FilterType.Past:
        fn = (it) => it.timeEnd.getTime() < now
        break
    }
    return this.model.getData().filter(fn)
  }

  private renderPoints(data: Point[]) {
    let dayView: Day = new Day();

    if (this.sort !== SortType.Event) {
      render(this.daysView, dayView)
      for (const point of data) {
        this.renderPoint(dayView, point);
      }
    } else {
      let prevPoint: Point | null = null
      let counterDay = 0
      for (const point of data) {
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
    this.model.update(newPoint)
  }

  private onPointAction(type: Actions, payload?: any) {
    switch (type) {
      case Actions.Delete:
        this.model.remove(payload)
        break
    }
  }

  private onChangePoint(newPoint: Point) {
    const index = this.model.getData().findIndex((point) => point.id === newPoint.id)
    const oldPoint = this.model.getData()[index]
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

  private onFilterChange() {
    this.sort = SortType.Event
    this.sortView.update(this.sort)
    this.update()
  }
}
