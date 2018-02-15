import sinon from 'sinon';
import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { expect } from 'chai';
import { Api } from 'services';
import { ActionType } from 'modules/actions'
import {
  fetchGithubData,
  fetchUserSideEffects,
  fetchReposSideEffects,
  updateField,
  searchGithubUser,
  searchGithubRepos,
  searchGithubUserStarredRepos,
  } from 'modules/GithubManager'

describe('watchGithubRequest', () => {
  it('should call fetchUserSideEffects', () => {
    const generator = cloneableGenerator(fetchUserSideEffects)(searchGithubUser('test'));
    expect(generator.next().value).to.deep.equal(call(fetchGithubData, 'users/test', true));

    expect(generator.next({
      response: {
        user: 'user'
      }
    }).value).to.deep.equal(put(updateField('user', {
      user: 'user'
    })));

    expect(generator.next().done).to.equal(true)
  })

  it('should call searchGithubRepos', () => {
    const generator = cloneableGenerator(fetchReposSideEffects)(searchGithubRepos('user', 'repos'));
    expect(generator.next().value).to.deep.equal(call(fetchGithubData, 'repos/user/repos', true));

    expect(generator.next({
      response: {
        repos: 'repos'
      }
    }).value).to.deep.equal(put(updateField('repository', {
      repos: 'repos'
    })));

    expect(generator.next().done).to.equal(true)
  })

})
