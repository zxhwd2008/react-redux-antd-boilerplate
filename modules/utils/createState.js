import { Record, Set, List, Map } from 'immutable'
import { getFieldFromState, setField } from './immutableUtils'

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
    (value = undefined) =>
    (value === undefined ? getFieldFromState(State.name)(prop) : setField(prop)(value))

    if (Set.isSet(defaultValue)) {
      State[prop] = action => (value = undefined) => state => {
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
      State[prop] = action => (key = undefined, value = undefined) => state => {
        let collection = getterAndSetter()(state)
        if (action === 'add' && key !== undefined && value !== undefined) {
          collection = collection.set(key, value)
        } else if (action === 'remove' && key !== undefined) {
          collection = collection.remove(key)
        }
        return key === undefined && value === undefined
        ? getterAndSetter()(state) : getterAndSetter(collection)(state)
      }
    } else {
      State[prop] = (value = undefined) => state =>
      (value !== undefined ? getterAndSetter(value)(state) : getterAndSetter()(state))
    }
  })

  return State
}
