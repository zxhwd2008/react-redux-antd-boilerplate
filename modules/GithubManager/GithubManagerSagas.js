import { call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import moment from 'moment'
import { getFormValues } from 'redux-form/immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { Api } from '../../services'
import { updateField, mandrillTemplateData } from './index'
import { ActionType } from '../actions'
import { pipedrivePersonData, pipedriveLeadData } from '../utils/pipedriveUtils'


function* fetchCarData(resource, field) {
  const carData = yield call(Api.getCarData, resource)

  if (!carData.error) {
    switch (field) {
      case 'brand':
        yield put(updateField('model', []))
        yield put(updateField('year', []))
        yield put(updateField('construction', []))
        yield put(updateField('submodel', []))
        yield put(updateField('type', []))
        break
      case 'model':
        yield put(updateField('year', []))
        yield put(updateField('construction', []))
        yield put(updateField('submodel', []))
        yield put(updateField('type', []))
        break
      case 'year':
        yield put(updateField('construction', []))
        yield put(updateField('submodel', []))
        yield put(updateField('type', []))
        break
      case 'construction':
        yield put(updateField('submodel', []))
        yield put(updateField('type', []))
        break
      case 'submodel':
        yield put(updateField('type', []))
        break
      default:
    }
    yield put(updateField(field, carData.response[field]))
  }
}

export function* customerFetchSideEffects(action) {
  if (action.payload && action.payload.pathname) {
    const pathnames = action.payload.pathname.split('/')
    if (pathnames[1].toLowerCase() === 'kostenlose-fahrzeugbewertung' &&
    (pathnames.length === 2 || pathnames.length === 4)) {
      yield call(fetchCarData, 'cars/brand', 'brand')
    }

    if (pathnames[1].toLowerCase() === 'kostenlose-fahrzeugbewertung' &&
    pathnames.length === 4 &&
    pathnames[3]) {
      const pipedriveDeal = yield call(Api.getDealFromPipedrive, 'deals/' + pathnames[3])

      if (!pipedriveDeal.error) {
        const person = pipedriveDeal.response.data.person_id
        const name = person.name.split(' ')
        const leadObj = {
          leadID: pathnames[3],
          firstname: name[0],
          lastname: name[1],
          email: person.email[0].value,
          phone: person.phone[0].value,
        }
        yield put(updateField('lead', leadObj))
      }
    }
  }

  if (action.payload && action.payload.field && action.payload.resource) {
    yield call(fetchCarData, action.payload.resource, action.payload.field)
  }
}

export function* customerSendSideEffects(action) {
  const customerFields = yield select(state => getFormValues('customer')(state))
  customerFields.submodel = customerFields.submodel.split(' - ')[0]
  yield call(generateMandrillData, customerFields)

  const response = yield call(Api.sendCustomer, 'customers', customerFields)

  if (!response.error) {
    const newCustomer = response.response
    yield call(Api.sendToMandrill, mandrillTemplateData)
    if (!customerFields.leadID) {
      yield call(generatePipedrivePersonData, customerFields)
      const person = yield call(Api.sendToPipedrive, 'persons', pipedrivePersonData)
      if (person.response.success) {
        yield call(generatePipedriveDealData, newCustomer, person)
        yield call(Api.sendToPipedrive, 'deals', pipedriveLeadData)
      }
    } else {
      yield call(generatePipedriveDealData, newCustomer, null, 30, 1697308)
      yield call(Api.updateToPipedrive, 'deals/' + customerFields.leadID, pipedriveLeadData)
    }
    action.meta.resolve(response.response)
  } else {
    action.meta.reject(response.error)
  }
}

function generateMandrillData(customerFields) {
  mandrillTemplateData.message.to[0].name =
  customerFields.firstname + ' ' + customerFields.lastname
  mandrillTemplateData.message.merge_vars[0].vars[0].content = customerFields.firstname
  mandrillTemplateData.message.merge_vars[0].vars[1].content = customerFields.lastname
  mandrillTemplateData.message.merge_vars[0].vars[2].content = customerFields.brand
  mandrillTemplateData.message.merge_vars[0].vars[3].content = customerFields.model
  mandrillTemplateData.message.merge_vars[0].vars[4].content = customerFields.submodel
  mandrillTemplateData.message.merge_vars[0].vars[5].content = customerFields.doors
  mandrillTemplateData.message.merge_vars[0].vars[6].content = customerFields.construction
  mandrillTemplateData.message.merge_vars[0].vars[7].content =
  customerFields.year === 2005 ? '2005 oder älter' : customerFields.year
  mandrillTemplateData.message.merge_vars[0].vars[8].content =
  customerFields.fromAbroad ? 'Ja' : 'Nein'
  mandrillTemplateData.message.merge_vars[0].vars[9].content = customerFields.mileage
  mandrillTemplateData.message.merge_vars[0].vars[10].content = customerFields.power
  mandrillTemplateData.message.merge_vars[0].vars[11].content = customerFields.gearType
  mandrillTemplateData.message.merge_vars[0].vars[12].content = customerFields.previousOwners
  mandrillTemplateData.message.merge_vars[0].vars[13].content = customerFields.tire
  mandrillTemplateData.message.merge_vars[0].vars[14].content =
  customerFields.accident ? 'Ja' : 'Nein'
  if (typeof (customerFields.accidentDocumented) === 'boolean') {
    mandrillTemplateData.message.merge_vars[0].vars[15].content =
    customerFields.accidentDocumented ? 'Ja' : 'Nein'
  } else {
    mandrillTemplateData.message.merge_vars[0].vars[15].content = customerFields.accidentDocumented
  }
  if (typeof (customerFields.repairInvoice) === 'boolean') {
    mandrillTemplateData.message.merge_vars[0].vars[16].content =
    customerFields.repairInvoice ? 'Ja' : 'Nein'
  } else {
    mandrillTemplateData.message.merge_vars[0].vars[16].content = customerFields.repairInvoice
  }
  mandrillTemplateData.message.merge_vars[0].vars[17].content =
  customerFields.pet ? 'Ja' : 'Nein'
  mandrillTemplateData.message.merge_vars[0].vars[18].content =
  customerFields.smoke ? 'Ja' : 'Nein'
  mandrillTemplateData.message.merge_vars[0].vars[19].content = customerFields.condition
  mandrillTemplateData.message.merge_vars[0].vars[20].content = customerFields.price
  mandrillTemplateData.message.merge_vars[0].vars[21].content = customerFields.priceMin
  mandrillTemplateData.message.merge_vars[0].vars[22].content = customerFields.location
  mandrillTemplateData.message.merge_vars[0].vars[23].content = customerFields.phone
  mandrillTemplateData.message.merge_vars[0].vars[24].content = customerFields.email
}

function generatePipedrivePersonData(customerFields) {
  pipedrivePersonData.email = customerFields.email
  pipedrivePersonData.name = customerFields.firstname + ' ' + customerFields.lastname
  pipedrivePersonData.phone = customerFields.phone
  pipedrivePersonData.add_time = moment().format('YYYY-MM-DD HH:mm:ss')
}

function generatePipedriveDealData(newCustomer, person, stageID, userID) {
  pipedriveLeadData.title = newCustomer.brand + ' ' + newCustomer.model
  if (person && person.response) {
    pipedriveLeadData.person_id = person.response.data.id
  }
  pipedriveLeadData.stage_id = stageID || pipedriveLeadData.stage_id
  pipedriveLeadData.user_id = stageID ? userID : pipedriveLeadData.user_id
  pipedriveLeadData['86f6efe67d68b95ab6f7ffe7071170011acbc8d3'] = newCustomer._id
  pipedriveLeadData.bc55eeb708d086d177dfa905b844ec0a1f848a9a = newCustomer.brand
  pipedriveLeadData.ee6ca31960ca9b6daa08ab36674aa16b22b6810d = newCustomer.model
  pipedriveLeadData.ea5aed9ccfe397d10669ac497caa3a1a4d3ccdfb = newCustomer.submodel
  pipedriveLeadData.d773a31950107531f0f658700759ff0eb14fd560 = newCustomer.gearType
  pipedriveLeadData['5a44fbdfef085af5716d0ffbcc6fc6d45199da1a'] = newCustomer.doors
  pipedriveLeadData['8918214d94570fc32ef05348bb4479272f871fc5'] =
  newCustomer.year === 2005 ? '2005 oder älter' : newCustomer.year
  pipedriveLeadData['1d9d9cf38abc4fd1feeccb885d532ee84fede24b'] = newCustomer.mileage
  pipedriveLeadData.d511087f02c79f5c2862c3a6c448b47ab9abc0ce = newCustomer.power
  pipedriveLeadData['5ec24149c462ac4ebbe90de19a31d06bbd5d58ca'] = newCustomer.location
  pipedriveLeadData.e7a782fd4bef0a728393de28ff2cd876681ef5fb = newCustomer.construction
  pipedriveLeadData.f2ab43dba936273a2659141946a98f41d3eded0a =
  newCustomer.fromAbroad ? 'Ja' : 'Nein'
  pipedriveLeadData['48bbc80d5be78ecf2498efc40381ff007cbe874f'] = newCustomer.previousOwners
  pipedriveLeadData['1ef0c389ec5bbf1c1b25fee30bff577cc4b854c0'] =
  newCustomer.accident ? 'Ja' : 'Nein'
  pipedriveLeadData['7c6d0426b09a001537179b8a95efefd5b1341a4e'] = newCustomer.condition
  pipedriveLeadData.a42d9c7cd9da11a6ab5dbf0d51b7a1f625b637ce = newCustomer.tire
  pipedriveLeadData.a538d586d5b45a925b075cbf411daf235f047421 =
  newCustomer.smoke ? 'Ja' : 'Nein'
  pipedriveLeadData['57f1229b39042a0711272c7de474d0a1f81fa743'] =
  newCustomer.pet ? 'Ja' : 'Nein'
  if (typeof (newCustomer.accidentDocumented) === 'boolean') {
    pipedriveLeadData['29f76f194ecc64239193295fc7b49ab3765ae16b'] =
    newCustomer.accidentDocumented ? 'Ja' : 'Nein'
  } else {
    pipedriveLeadData['29f76f194ecc64239193295fc7b49ab3765ae16b'] = newCustomer.accidentDocumented
  }

  if (typeof (newCustomer.repairInvoice) === 'boolean') {
    pipedriveLeadData['4913503466674f0d8191305a55b486961d82a0a2'] =
    newCustomer.repairInvoice ? 'Ja' : 'Nein'
  } else {
    pipedriveLeadData['4913503466674f0d8191305a55b486961d82a0a2'] = newCustomer.repairInvoice
  }

  pipedriveLeadData['71993ae239bfe46f8dcd2fcba780acb7d3581038'] = newCustomer.price
  pipedriveLeadData['5c2729a5c2df72801d4bea573198c41d705b9b5d'] = newCustomer.priceMin

  pipedriveLeadData['503ac513dbe0a44d0ec2afca30343496ebff14fe'] = newCustomer.utm_source
  pipedriveLeadData.f9417af6ce3113188bc2eb2519a1873b4f11cd46 = newCustomer.utm_medium
  pipedriveLeadData['1745d70fa3f2016c578a936c38eed5912b6fa13e'] = newCustomer.utm_campaign
  pipedriveLeadData.b34403406a54419f4de10979eb40acb468bb0003 = newCustomer.utm_term
  pipedriveLeadData.c2309acc0b6d7f868d7f005607f9556ef6a91b43 = newCustomer.utm_content
}

export function* watchCustomerRequest() {
  yield [
    takeEvery(LOCATION_CHANGE, customerFetchSideEffects),
    takeEvery(ActionType.CUSTOMER.FETCH_CAR_DATA, customerFetchSideEffects),
    takeEvery(ActionType.CUSTOMER.SEND, customerSendSideEffects),
  ]
}
