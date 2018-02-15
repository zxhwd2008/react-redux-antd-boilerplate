import {
  githubManagerReducer,
  updateField,
  searchGithubUser,
  searchGithubRepos,
  searchGithubUserStarredRepos,
  } from 'modules/GithubManager'
import { ActionType } from 'modules/actions'
import { expect } from 'chai';


describe('githubManagerReducer', () => {
  it('should return action updateField', () => {
    const action = updateField('field', 'value')
    expect(action).to.deep.equal({
      type: ActionType.GITHUBMANAGER.UPDATE_FIELD,
      payload: {
        field: 'field',
        value: 'value',
      },
    })
  })

  it('should return action searchGithubUser', () => {
    const action = searchGithubUser('user')
    expect(action).to.deep.equal({
      type: ActionType.GITHUBMANAGER.FETCH_USER,
      payload: {
        user: 'user'
      },
    })
  })

  it('should return action searchGithubRepos', () => {
    const action = searchGithubRepos('user', 'repos')
    expect(action).to.deep.equal({
      type: ActionType.GITHUBMANAGER.FETCH_REPOSITORY,
      payload: {
        user: 'user',
        repos: 'repos',
      },
    })
  })

  it('should return action searchGithubUserStarredRepos', () => {
    const action = searchGithubUserStarredRepos('user')
    expect(action).to.deep.equal({
      type: ActionType.GITHUBMANAGER.FETCH_USER_STARRED_REPOS,
      payload: {
        user: 'user',
      },
    })
  })

  it('should call the reducer and update page field', () => {
    const action = {
      type: ActionType.GITHUBMANAGER.UPDATE_FIELD,
      payload: {
        field: 'page',
        value: 2,
      },
    }

    const newState = githubManagerReducer(undefined, action).toJS();

    expect(newState).to.deep.equal({
      totalStarredRepos: null,
      user: null,
      repository: null,
      starredRepos: null,
      page: 2,
      sort: 'created',
    })
  })
})
