import {FilterType} from '../components/filter'

export default class Filter extends EventTarget {
  private value: FilterType = FilterType.Everything
  get() {
    return this.value
  }

  set(value: FilterType) {
    this.value = value
    this.dispatchEvent(new Event('change'))
  }
}
