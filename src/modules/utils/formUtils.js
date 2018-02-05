import { scroller } from 'react-scroll'
import { compose } from './functionalUtils'

export const scrollToFirstErrorComposer = (errors) => compose(scrollToFirstError, flatten, getErrorFieldNames)(errors)

function scrollToFirstError(errorFields) {
  // Using breakable for loop
  for (let i = 0; i < errorFields.length; i++) {
    const fieldName = `position-${errorFields[i]}`
    // Checking if the marker exists in DOM
    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, { offset: -100, smooth: true, duration: 200 })
      break
    }
  }
}

function getErrorFieldNames(obj, name = '') {
  const errorArr = []
  errorArr.push(Object.keys(obj).map((key) => {
    const next = obj[key]
    if (next) {
      if (typeof next === 'string') {
        return name + key
      }
      // Keep looking
      if (next.map) {
        errorArr.push(next.map((item, index) => getErrorFieldNames(item, `${name}${key}[${index}].`)).filter(o => o))
      }
    }
    return null;
  }).filter(o => o));
  return errorArr
}

function flatten(arr) {
  return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), [])
}
