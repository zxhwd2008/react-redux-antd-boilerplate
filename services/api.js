import 'isomorphic-fetch'
import { constants } from './constants'

function callApi(endpoint, data = null, method = 'GET') {
  const fullUrl = (endpoint.indexOf('http://') && endpoint.indexOf('https://') === -1) ? constants.API_ROOT + endpoint : endpoint
  let config = {
    method,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }

  if (method === 'POST' || method === 'PUT') {
    config.body = JSON.stringify(data)
  }

  return fetch(fullUrl, config)
  .then(response =>
    response.json().then(json => ({ json, response }))
  )
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json)
    }

    return json
  })
  .then(
    response => ({response}),
    error => ({error: error.message || 'Something bad happened'})
  )
}

// api services

// Contact
export const sendContact = (contactUrl, contact) => callApi(`/${contactUrl}`, contact, 'POST')

// Contract
export const sendContract = (contractUrl, contract) => callApi(`/${contractUrl}`, contract, 'POST')

// ContractOptions
export const sendContractOptions = (contractOptionsUrl, contractOptions) => callApi(`/${contractOptionsUrl}`, contractOptions, 'POST')

// Customers
export const sendCustomer = (customerUrl, customer) => callApi(`/${customerUrl}`, customer, 'POST')
export const getCustomer = (customerUrl) => callApi(`/${customerUrl}`)

// Cars
export const getCarData = (resource) => callApi(`/${resource}`)
