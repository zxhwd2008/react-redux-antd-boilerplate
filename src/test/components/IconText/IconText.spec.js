import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Icon } from 'antd'
import { IconText } from 'components/IconText'

describe('<IconText />', () => {
  it('should render the <IconText /> component', () => {
    const wrapper = shallow(<IconText type="type" text="text" />)
    expect(wrapper.find(Icon)).to.have.length(1)
  })
})
