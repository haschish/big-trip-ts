import View from '../components/view'
import {Point} from '../data'
import EventView from '../components/event'
import EventFormView from '../components/event-form'
import {render, replace} from '../util'

export default class PointPresenter {
  private eventView: EventView
  private eventFormView: EventFormView

  constructor(private container: View | Element, private point: Point, onUpdatePoint?: Function) {
    this.eventView = new EventView(this.point)
    this.eventFormView = new EventFormView(this.point, onUpdatePoint)

    this.eventView.addClickRollUpListener(() => {
      this.replaceEventToForm()
    })

    this.eventFormView.addSubmitListener(() => {
      this.replaceFormToEvent()
    })

    this.onDocumentKeydown = this.onDocumentKeydown.bind(this)
  }

  private replaceEventToForm() {
    replace(this.container!, this.eventFormView, this.eventView)
    this.eventView.removeElement()
    document.addEventListener('keydown', this.onDocumentKeydown)
  }

  private replaceFormToEvent() {
    replace(this.container, this.eventView, this.eventFormView)
    this.eventFormView.removeElement()
    document.removeEventListener('keydown', this.onDocumentKeydown)
  }

  private onDocumentKeydown(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.replaceFormToEvent()
    }
  }

  render() {
    render(this.container, this.eventView)
  }

  update(newPoint: Point) {
    this.eventView.update(newPoint)
    this.eventFormView.update(newPoint)
  }
}
