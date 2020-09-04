export const transferTypes = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight']
export const activityTypes = ['check-in', 'sightseeing', 'restaurant']
const types = transferTypes.concat(activityTypes)

const cities = ['Amsterdam', 'Chamonix', 'Geneva']

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
]

const offerTexts = [
  'Choose meal',
  'Upgrade to comfort class',
  'Choose the radio station',
  'Upgrade to a business class'
]

export const getPrepositionForType = (type: string) => activityTypes.includes(type) ? 'in' : 'to'

const getRandomElement = <T> (arg: Array<T>): T => {
  const index = Math.floor(Math.random() * arg.length)
  return arg[index]
}

const getRandomInt = (a: number, b: number = 0) => {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.round(Math.random() * (max - min)) + min
}

const generateOffers = (): Offer[] => {
  const arr: Offer[] = []
  for (const type of types) {
    const num = getRandomInt(5)
    for( let i = 0; i < num; i++) {
      arr.push({
        type,
        title: getRandomElement(offerTexts),
        price: getRandomInt(100, 30)
      })
    }
  }
  return arr
}

const generatePhotos = (num: number): string[] => {
  const arr: string[] = [];
  for (let i = 0; i < num; i++) {
    arr.push(`http://picsum.photos/248/152?r=${Math.random()}`)
  }
  return arr
}

const generateDescriptions = (): Map<string, Description> => {
  const data = new Map<string, Description> ()
  for (const city of cities) {
    data.set(city, {
      text: descriptions.slice(getRandomInt(descriptions.length)).join(' '),
      pictures: generatePhotos(getRandomInt(7))
    })
  }

  return data
}
const descriptionsMap = generateDescriptions()
export const getDescriptions = () => descriptionsMap

const generateDate = (date: Date = new Date(), duration: number = 0) => {
  const result = new Date(date)
  result.setMinutes(date.getMinutes() + duration);
  return result;
}

const generateId = () => (Math.floor(Date.now() / getRandomInt(1000) * getRandomInt(1000))).toString(32)

export type Offer = {
  type: string
  title: string,
  price: number,
  checked?: boolean
}

export type Description = {
  text: string,
  pictures: string[]
}

export type Point = {
  id: string,
  type: string,
  destination: string,
  offers: Offer[],
  description?: Description,
  price: number,
  timeStart: Date,
  timeEnd: Date
  isFavorite: boolean
}

export type Total = {
  cities: string[],
  dateStart: Date,
  dateEnd: Date,
  cost: number
}

const generatePoint = (timeStart: Date, timeEnd: Date): Point => {
  const type = getRandomElement(types)
  const offersOfType = offers.filter((it) => it.type === type).map((it) => Object.assign({}, it, {checked: Boolean(getRandomInt(0, 1))}))
  const destination = getRandomElement(cities)

  return {
    id: generateId(),
    type,
    destination,
    offers: offersOfType,
    description: descriptionsMap.get(destination)!,
    price: getRandomInt(20, 100),
    timeStart,
    timeEnd,
    isFavorite: Boolean(getRandomInt(0, 1))
  }
}

export const generateEvents = (num: number): Point[] => {
  const arr: Point[] = [];
  let startDate = generateDate();
  let stopDate = generateDate(startDate, getRandomInt(30, 60))
  for (let i = 0; i < num; i++) {

    arr.push(generatePoint(startDate, stopDate))
    startDate = generateDate(stopDate, getRandomInt(200, 300))
    stopDate = generateDate(startDate, getRandomInt(30, 2000))
  }
  return arr;
}

export const getTotal = (arr: Point[]): Total => {
  const cities = [...(new Set(arr.map(it => it.destination)))]
  const cost = arr.reduce((acc, point) => {
    const offersCost = point.offers.filter(it => it.checked).reduce((acc, offer) => acc += offer.price, 0)
    return acc += (point.price + offersCost)
  }, 0)

  return {
    cities,
    dateStart: arr.length > 0 ? new Date(arr[0].timeStart) : new Date(),
    dateEnd: arr.length > 0 ? new Date(arr[arr.length - 1].timeEnd) : new Date(),
    cost
  }
}

const offers = generateOffers()
export const getOffers = () => {
  return offers
}

export enum Actions {
  Add = 'add',
  Delete = 'delete',
  Save = 'update',
  OpenPoint = 'open-point',
  Change = 'change'
}
