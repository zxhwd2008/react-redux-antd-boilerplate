import React from 'react';
import { Select } from 'antd'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Filters } from 'routes/GithubStarredManager/Filters'

const Option = Select.Option

const props = {
  user: {
    login: 'test'
  },
  sort: 'created',
  updateField: sinon.spy(),
  searchGithubUserStarredRepos: sinon.spy(),
}

const wrapper = shallow(<Filters {...props}/>)

describe('<Filters />', () => {
  it('should render the Select component', () => {
    expect(wrapper.find(Select)).to.have.length(1)
  })

  it('should call updateField when user selects', () => {
    wrapper.find(Select).simulate('change', 'updated');
    expect(props.updateField.calledWith('sort', 'updated')).to.equal(true)
  })

  it('should call searchGithubUserStarredRepos when user selects', () => {
    wrapper.find(Select).simulate('change', 'updated');
    expect(props.searchGithubUserStarredRepos.calledWith('test')).to.equal(true)
  })
})
