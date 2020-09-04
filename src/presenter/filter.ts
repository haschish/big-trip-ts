import FilterView, {FilterType} from '../components/filter'
import {render} from '../util'
import FilterModel from '../model/filter'

export default class Filter {
  private filterView: FilterView

  constructor(private container: Element, private model: FilterModel ) {
    this.onChangeView = this.onChangeView.bind(this)
    this.filterView = new FilterView(this.model.get(), this.onChangeView)
  }

  init() {
    render(this.container, this.filterView)
  }

  onChangeView(value: FilterType) {
    this.model.set(value)
  }
}
