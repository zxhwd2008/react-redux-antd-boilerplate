import { createState } from '../utils/createState'

export const GithubManager = createState({
  name: 'GithubManager',
  fields: {
    brand: [],
    model: [],
    year: [],
    construction: [],
    submodel: [],
    type: [],
    lead: null,
    showSuccessMessage: false,
  },
})
