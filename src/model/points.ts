import {Point} from '../data'
import {SortType} from '../components/sort'
export default class Points extends EventTarget {
  private data: Point[] = []

  getData() {
    return this.data
  }

  setData(data: Point[]) {
    this.data = data.slice()
  }

  update(newPoint: Point) {
    const index = this.data.findIndex((point) => point.id === newPoint.id)

    this.data = [...this.data.slice(0, index), newPoint, ...this.data.slice(index + 1)]
    this.dispatchEvent(new Event('update'))
  }

  remove(point: Point) {
    const index = this.findIndex(point)
    if (index) {
      this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)]
    }
  }

  private findIndex(point: Point) {
    return this.data.findIndex((p) => p.id === point.id)
  }

  sort(type: string) {
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
}
