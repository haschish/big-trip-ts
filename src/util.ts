export const upperFirst = (str: string) => (str.length > 0) ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export const formatDatetime = (date: Date) => {
  const day = String(date.getDay()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear() % 100
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const getChecked = (value: boolean) => value ? 'checked' : '';

export const render = (container: Element | null | undefined, template: string, place: InsertPosition = `beforeend` ) => {
  container?.insertAdjacentHTML(place, template)
}
