import { Record, Set, List, Map } from 'immutable'
import { getFieldFromState, getField, setField } from './immutableUtils'

export const createState = ({ name, fields }) => {
  const State = {
    create() {
      const StateShape = Record({ ...fields })
      return new StateShape()
    },
    get name() {
      return name
    },
  }

  Object.keys(fields).forEach(prop => {
    const defaultValue = fields[prop]
    const getterAndSetter =
    (value = undefined, field = undefined) => {
      if (value !== undefined) {
        return setField(prop)(value)
      }
      return field === undefined ? getFieldFromState(State.name)(prop) : getField(field)
    }
    if (Set.isSet(defaultValue)) {
      State[prop] = (value = undefined, key = undefined, action = undefined) => state => {
        let collection = getterAndSetter()(state)
        if (value !== undefined) {
          if (action === 'add') {
            collection = collection.add(value)
          } else if (action === 'remove') {
            collection = collection.remove(value)
          }
        }
        return value !== undefined ? getterAndSetter(collection)(state) : getterAndSetter()(state)
      }
    } else if (List.isList(defaultValue)) {
      State[prop] = (values = undefined) => state => {
        let collection = getterAndSetter()(state)
        if (values !== undefined) {
          collection = collection.push(...values)
        }
        return values !== undefined ? getterAndSetter(collection)(state) : getterAndSetter()(state)
      }
    } else if (Map.isMap(defaultValue)) {
      State[prop] = (value = undefined, key = undefined, action = undefined) => state => {
        let collection = action ? getterAndSetter(undefined, prop)(state) : getterAndSetter()(state)
        if (action === 'set' && key !== undefined && value !== undefined) {
          collection = collection.set(key, value)
        } else if (action === 'remove' && key !== undefined) {
          collection = collection.remove(key)
        } else if (action === 'clear') {
          collection = collection.clear()
        }
        return key === undefined && value === undefined
        ? collection : getterAndSetter(collection)(state)
      }
    } else {
      State[prop] = (value = undefined) => state => (value !== undefined
      ? getterAndSetter(value)(state) : getterAndSetter()(state))
    }
  })

  return State
}
