import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import { RootContainer } from '../containers/RootContainer'

import { Home } from '../routes/Home'

import { GithubManagerContainer } from '../containers/GithubManagerContainer'

export default (
  <Route path="/" component={RootContainer}>
    <IndexRoute component={Home} />

    <Route path="/github" component={GithubManagerContainer} />
    <Redirect from="*" to="/" />
  </Route>
)
