import View from '../components/view'
import {Point} from '../data'
import EventView from '../components/event'
import EventFormView from '../components/event-form'
import {render, replace} from '../util'

enum Mode {
  Normal = 'normal',
  Edit = 'edit'
}

export default class PointPresenter extends EventTarget {
  private eventView: EventView
  private eventFormView: EventFormView
  private static notEscInputs = [
    'event-destination'
  ]
  private mode = Mode.Normal
  // private modeListeners: EventT[] = []

  constructor(private container: View | Element, private point: Point, onUpdatePoint?: Function, onChangePoint?: Function) {
    super()
    this.eventView = new EventView(this.point)
    this.eventFormView = new EventFormView(this.point, onUpdatePoint, onChangePoint)

    this.eventView.addClickRollUpListener(() => {
      this.replaceEventToForm()
    })

    this.eventFormView.addSubmitListener(() => {
      this.replaceFormToEvent()
    })

    this.onDocumentKeydown = this.onDocumentKeydown.bind(this)
  }

  private replaceEventToForm() {
    this.dispatchEvent(new Event('startEdit'))
    this.eventFormView.update(this.point)
    replace(this.container, this.eventFormView, this.eventView)
    this.eventView.removeElement()
    document.addEventListener('keydown', this.onDocumentKeydown)
    this.mode = Mode.Edit
  }

  private replaceFormToEvent() {
    replace(this.container, this.eventView, this.eventFormView)
    this.eventFormView.removeElement()
    document.removeEventListener('keydown', this.onDocumentKeydown)
    this.mode = Mode.Normal
  }

  private onDocumentKeydown(evt: KeyboardEvent) {
    const element = <HTMLInputElement>evt.target
    if (evt.key === 'Escape' && !PointPresenter.notEscInputs.includes(element.name)) {
      this.replaceFormToEvent()
    }
  }

  render() {
    render(this.container, this.eventView)
  }

  update(newPoint: Point) {
    this.point = newPoint
    this.eventView.update(newPoint)
    this.eventFormView.update(newPoint)
  }

  updateFormOnly(newPoint: Point) {
    this.eventFormView.update(newPoint)
  }

  resetView() {
    if (this.mode === Mode.Edit) {
      this.replaceFormToEvent()
    }
  }
}
