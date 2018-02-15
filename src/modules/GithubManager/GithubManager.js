import { createState } from 'modules/utils/createState'

export const GithubManager = createState({
  name: 'githubManager',
  fields: {
    totalStarredRepos: null,
    user: null,
    repository: null,
    starredRepos: null,
    page: 1,
    sort: 'created',
  },
})
