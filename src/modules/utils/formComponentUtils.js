import React from 'react'
import classnames from 'classnames'
import { Tooltip } from '../../components/Tooltip'

export const inputField =
({ input, label, type, placeholder, tooltip, onBlur, onFocus, meta: { touched, error } }) => {
  const inputClasses = classnames(
    'form-control',
    touched && !error && 'field-valid',
    touched && error && 'field-error')
  return (
    <div>
      {label ? <label>{label}</label> : null }
      {tooltip ? <Tooltip title="?" text={tooltip} /> : null}
      <div>
        <input {...input} className={inputClasses} placeholder={placeholder} type={type} onBlur={
            (e) => {
              input.onBlur(e)
              if(onBlur && typeof onBlur === 'function') {
                onBlur(e)
              }
            }
        } onFocus={
            (e) => {
              input.onFocus(e)
              if(onFocus && typeof onFocus === 'function') {
                onFocus(e)
              }
            }
        } />
        {touched && error && <span className="field-error">{error}</span>}
      </div>
    </div>
  )
}

inputField.propTypes = {
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  tooltip: React.PropTypes.boolean,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  meta: React.PropTypes.object,
}

export const inputNumberField = ({ input, label, type, placeholder, tooltip, onBlur, onFocus, meta: { touched, error } }) => {
  let inputClasses = classnames('form-control', touched && !error && 'field-valid', touched && error && 'field-error')
  const value = input.value.replace(/[\.,]/g, '')
  input.value = window.Intl && input.value && !isNaN(Number(value)) ? new Intl.NumberFormat('de-DE').format(value) : input.value
  return (
    <div>
      {label ? <label>{label}</label> : null }
      {tooltip ?  <Tooltip title="?" text={tooltip} /> : null}
      <div>
        <input {...input} className={inputClasses} placeholder={placeholder} type={type} onBlur={
            (e) => {
              input.onBlur(e)
              if(onBlur && typeof onBlur === 'function') {
                onBlur(e)
              }
            }
        } onFocus={
            (e) => {
              input.onFocus(e)
              if(onFocus && typeof onFocus === 'function') {
                onFocus(e)
              }
            }
        }/>
        {touched && error && <span className="field-error">{error}</span>}
      </div>
    </div>
  )
}

export const textareaField = ({input, label, placeholder, rows}) => (
  <div>
    {label ? <label>{label}</label> : ''}
    <textarea {...input} className="form-control" placeholder={placeholder} rows={rows} />
  </div>
)

export const selectField = (field) => {
  return (
    <div>
      {field.label ? <label className="col-sm-4 text-right">{field.label}</label> : '' }
      <div className="col-sm-8">
        <select disabled={field.children.length === 0} {...field.input} className={field.className} onChange={
            (e) => {
              field.input.onChange(e)
              if(field.onChangeAction && typeof field.onChangeAction === 'function') {
                field.onChangeAction(e)
              }
            }
          }>
          <option value="" key="no-selection">
            {field.placeholder}
          </option>
          {field.children}
        </select>
        {field.meta.touched && field.meta.error && <span className="field-error">{field.meta.error}</span>}
      </div>
    </div>
  )
}

export const selectionField = (field) => {
  return (
    <div className="selectionWrapper">
      <input type="radio" {...field.input} />
      <div className={classnames('selection', {selected: field.selected})} onClick={
          () => {
            field.input.onChange(field.onChangeValue)
            if(field.onChangeAction && typeof field.onChangeAction === 'function') {
              field.onChangeAction(field.onChangeValue)
            }
          }
        }>
        <span className={field.selectionClass}>
          {field.selection}
        </span>
      </div>
      <div className="selectionText">
          {field.selectionText}
      </div>
    </div>
  )
}
