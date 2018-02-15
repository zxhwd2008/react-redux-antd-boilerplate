import { createState } from 'modules/utils/createState'

export const Root = createState({
  name: 'root',
  fields: {
    currentTask: 0,
  },
})
