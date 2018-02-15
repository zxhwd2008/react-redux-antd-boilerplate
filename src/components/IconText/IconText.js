import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

export const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

IconText.propTypes = {
  type: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}
