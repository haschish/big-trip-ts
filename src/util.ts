import View from './components/view'
export const upperFirst = (str: string) => (str.length > 0) ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export const formatDatetime = (date: Date) => {
  const day = String(date.getDay()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear() % 100
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const getChecked = (value?: boolean) => value ? 'checked' : ''

export const render = (container: Element | View, view: View, place: InsertPosition = `beforeend` ) => {
  if (container instanceof View) {
    container.getElement()!.insertAdjacentElement(place, view.getElement()!)
  } else {
    container.insertAdjacentElement(place, view.getElement()!)
  }
}

export const replace = (container: Element | View, newChild: View, oldChild: View) => {
  if (container instanceof View) {
    container.getElement()?.replaceChild(newChild.getElement()!, oldChild.getElement()!)
  } else {
    container.replaceChild(newChild.getElement()!, oldChild.getElement()!)
  }
}

export enum Position {
  After,
  Before
}

export const renderElement = (container: Element | null, element: Element | null, place: Position = Position.After) => {
  if (!element) {
    return;
  }
  switch (place) {
    case Position.After:
    container?.appendChild(element)
      break;
    case Position.Before:
      container?.insertBefore(element, container.firstChild)
      break;
  }
}

export const createElement = (template: string): Element | null => {
  const div = document.createElement('div');
  div.innerHTML = template;
  const nodes = div.childNodes;
  for (const node of nodes) {
    if (!(node instanceof Text)) {
      return <Element>node;
    }
  }
  return null;
}
