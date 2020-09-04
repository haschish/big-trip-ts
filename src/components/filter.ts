import SmartView from './smart-view'
import {getChecked, upperFirst} from '../util'

export enum FilterType {
  Everything = 'everything',
  Future = 'future',
  Past = 'past'
}

const getFilterTemplate = (name: string, selected: string) => {
  const checked = getChecked(name === selected)
  console.log(name, selected)

  return `
  <div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${checked}>
    <label class="trip-filters__filter-label" for="filter-${name}">${upperFirst(name)}</label>
  </div>`
}

const createFilterTemplate = (selected: FilterType) => {
  const filters = Object.values(FilterType).map(it => getFilterTemplate(it, selected)).join('')

  return `
  <div>
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filters}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`
}

export default class Filter extends SmartView {
  constructor(private selected: FilterType, private onChange: Function = () => {}) {
    super()
    this.onFormChange = this.onFormChange.bind(this)
  }

  protected getTemplate() {
    return createFilterTemplate(this.selected)
  }

  restoreHadlers() {
    this.getElement()!.querySelector('form')?.addEventListener('change', this.onFormChange)
  }

  onFormChange(e: Event) {
    const element = <HTMLInputElement>e.target
    this.onChange(element.value)
  }
}
