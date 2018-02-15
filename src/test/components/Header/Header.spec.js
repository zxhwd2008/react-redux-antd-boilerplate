import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Header } from 'components/Header'
import { SearchBarContainer } from 'containers/SearchBarContainer'

const wrapper = shallow(<Header />)

describe('<Header />', () => {
  it('should render the SearchBar', () => {
    expect(wrapper.find(SearchBarContainer)).to.have.length(1);
  })
})
