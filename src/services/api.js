import 'isomorphic-fetch'
import { constants } from './constants'

function callApi(endpoint, data = null, method = 'GET') {
  const fullUrl = (endpoint.indexOf('http://') && endpoint.indexOf('https://') === -1) ? constants.API_ROOT + endpoint : endpoint
  const config = {
    method,
    mode: 'cors',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }

  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    config.body = JSON.stringify(data)
  }

  return fetch(fullUrl, config)
  .then(response => response.json().then(json => ({ json, response, headers: response.headers })))
  .then(({ json, response, headers }) => (!response.ok ? Promise.reject(json) : { json, headers }))
  .then(
    ({ json, headers }) => ({ response: json, headers }),
    error => ({ error: error.message || 'Something bad happened' })
  )
}

// api services
export const get = (resource) =>
callApi(`/${resource}`, null, 'GET')

export const post = (resource, data) =>
callApi(`/${resource}`, data, 'POST')

export const del = (resource, data) =>
callApi(`/${resource}`, data, 'DELETE')

export const put = (resource, data) =>
callApi(`/${resource}`, data, 'PUT')
