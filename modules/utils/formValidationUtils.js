export const requiredFieldValidate = (entity) => {
  const newEntity = Object.assign({}, entity)
  newEntity.error = newEntity.value === undefined ? 'Bitte füllen Sie dieses Feld aus.' : newEntity.error
  return newEntity
}

export const emailFieldValidate = (entity) => {
  const newEntity = Object.assign({}, entity)
  newEntity.error = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEntity.value) ? 'Bitte geben Sie eine gültige Email-Adresse an.' : newEntity.error
  return newEntity
}

export const numberFieldValidate = (entity) => {
  const newEntity = Object.assign({}, entity)
  newEntity.error = isNaN(Number(newEntity.value ? newEntity.value.replace(/[\.,]/g, '') : newEntity.value)) ? 'Bitte verwenden Sie nur Zahlen.' : newEntity.error
  return newEntity
}

export const letterFieldValidate = (entity) => {
  const newEntity = Object.assign({}, entity)
  newEntity.error = !/^[a-zA-Zäöüßéèê\-\s]+$/g.test(newEntity.value) ? 'Bitte verwenden Sie nur Buchstaben.' : newEntity.error
  return newEntity
}

export const letterAndNumberFieldValidate = (entity) => {
  const newEntity = Object.assign({}, entity)
  newEntity.error = !/^(?=.*[0-9])(?=.*[a-zA-Zäöüßéèê\-\s\.])([a-zA-Z0-9äöüßéèê\-\s\.]+)$/g.test(newEntity.value) ? 'Bitte geben Sie Straße und Hausnummer ein.' : newEntity.error
  return newEntity
}

export const lengthFieldValidate = (min = null) => (max = null) => (entity) => {
  const newEntity = Object.assign({}, entity)
  if (min && newEntity.value && newEntity.value.length < min) {
    newEntity.error = 'Geben Sie mindestens ' + min + ' Zeichen ein.'
  }
  if (max && newEntity.value && newEntity.value.length > max) {
    newEntity.error = 'Geben Sie weniger als ' + max + ' Zeichen ein.'
  }
  if (min === max && newEntity.value && newEntity.value.length !== min) {
    newEntity.error = 'Geben Sie genau ' + min + ' Zeichen ein.'
  }
  return newEntity
}

export const dateTimeFieldValidate = (entity) => {
  const newEntity = Object.assign({}, entity)
  newEntity.error = !/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:[1,2][6-9]|[2-9]\d)?\d{2})$/g.test(newEntity.value) ? 'Bitte geben Sie ein gültiges Datum ein. (z.B. 01.08.2012)' : newEntity.error
  return newEntity
}
