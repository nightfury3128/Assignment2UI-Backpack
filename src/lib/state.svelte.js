export const items = {
  laptop:     { label: 'Laptop' },
  chargers:   { label: 'Chargers' },
  bottle:     { label: 'Water bottle' },
  lunch:      { label: 'Lunch' },
  ipad:       { label: 'iPad' },
  toothbrush: { label: 'Toothbrush' },
  camera:     { label: 'Camera' },
  clothes:    { label: 'Clothes' },
  deodorant:  { label: 'Deodorant' },
  shoes:      { label: 'Shoes' },
  towel:      { label: 'Towel' },
}

export const dayTypes = {
  normal: { label: 'Normal Day',    required: ['ipad', 'lunch', 'bottle'] },
  long:   { label: 'Long Work Day', required: ['laptop', 'lunch', 'bottle', 'ipad', 'chargers'] },
  travel: { label: 'Travel Day',    required: ['toothbrush', 'camera', 'ipad', 'chargers'] },
  gym:    { label: 'Gym Day',       required: ['clothes', 'deodorant', 'shoes', 'towel', 'bottle'] },
}

export const state = $state({
  dayType: 'normal',
  present: {
    laptop:     false,
    chargers:   false,
    bottle:     false,
    lunch:      true,
    ipad:       true,
    toothbrush: false,
    camera:     false,
    clothes:    false,
    deodorant:  false,
    shoes:      false,
    towel:      false,
  },
  zipperOpen: true,
  weather: {
    temp: 26,
    rainExpectedAt: '15:00',
  },
  phoneDistance: 2,
  bagBattery: 82,
})

export function addItem(key)    { if (key in state.present) state.present[key] = true }
export function removeItem(key) { if (key in state.present) state.present[key] = false }

export function setZipper(open)      { state.zipperOpen = open }
export function setRain(expected)    { state.weather.rainExpectedAt = expected ? '15:00' : null }
export function setPhoneDistance(m)  { state.phoneDistance = m }
export function setDayType(key)      { if (key in dayTypes) state.dayType = key }

export function resetAll() {
  for (const key of Object.keys(state.present)) state.present[key] = false
  state.present.lunch = true
  state.present.ipad = true
  state.zipperOpen = true
  state.weather.rainExpectedAt = '15:00'
  state.phoneDistance = 2
  state.bagBattery = 82
  state.dayType = 'normal'
}
