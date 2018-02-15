import keyMirror from 'key-mirror-nested'

export const ActionType = keyMirror({
  ROOT: {
    UPDATE_NUMBER_FIELD: null,
  },
  GITHUBMANAGER: {
    FETCH_REPOSITORY: null,
    FETCH_USER: null,
    FETCH_USER_STARRED_REPOS: null,
    UPDATE_FIELD: null,
  },
})
