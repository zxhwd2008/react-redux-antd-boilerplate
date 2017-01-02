import { createState } from '../utils/createState'
import { constructMandrillTemplateData } from '../utils/mandrillUtils'

export const Customer = createState({
  name: 'Customer',
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

export const mandrillTemplateData = constructMandrillTemplateData('mpa-notification', [
  {
    rcpt: null,
    vars: [
      {
        name: 'fname',
        content: null,
      },
      {
        name: 'lname',
        content: null,
      },
      {
        name: 'brand',
        content: null,
      },
      {
        name: 'model',
        content: null,
      },
      {
        name: 'submodel',
        content: null,
      },
      {
        name: 'doors',
        content: null,
      },
      {
        name: 'construction',
        content: null,
      },
      {
        name: 'year',
        content: null,
      },
      {
        name: 'import',
        content: null,
      },
      {
        name: 'mileage',
        content: null,
      },
      {
        name: 'power',
        content: null,
      },
      {
        name: 'geartype',
        content: null,
      },
      {
        name: 'preowners',
        content: null,
      },
      {
        name: 'tires',
        content: null,
      },
      {
        name: 'accident',
        content: null,
      },
      {
        name: 'accidentdocumented',
        content: null,
      },
      {
        name: 'repairinvoice',
        content: null,
      },
      {
        name: 'pets',
        content: null,
      },
      {
        name: 'smoker',
        content: null,
      },
      {
        name: 'condition',
        content: null,
      },
      {
        name: 'price',
        content: null,
      },
      {
        name: 'pricemin',
        content: null,
      },
      {
        name: 'zipcode',
        content: null,
      },
      {
        name: 'phone',
        content: null,
      },
      {
        name: 'email',
        content: null,
      },
    ],
  },
])
