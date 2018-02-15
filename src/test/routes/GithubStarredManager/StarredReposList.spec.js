import React from 'react';
import { List } from 'antd'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { StarredReposList } from 'routes/GithubStarredManager/StarredReposList'
import { Filters } from 'routes/GithubStarredManager/Filters'
import { UserCard } from 'routes/GithubStarredManager/UserCard'

const props = {
  user: {
    login: 'test'
  },
  updateField: sinon.spy(),
  searchGithubUserStarredRepos: sinon.spy(),
  totalStarredRepos: 100,
  starredRepos: [],
  page: 1,
  sort: 'created',
}

const wrapper = shallow(<StarredReposList {...props}/>)

describe('<StarredReposList />', () => {
  it('should render empty <div /> when data are not loaded', () => {
    const wrapper = shallow(<StarredReposList {...props} user={null} />)
    expect(wrapper.html()).to.equal('<div></div>')
  })

  it('should have sort prop', () => {
    expect(wrapper.find({ sort: 'created' })).to.have.length(1)
  })

  it('should have user prop', () => {
    expect(wrapper.find({ user: {
      login: 'test'
    } })).to.have.length(2)
  })

  it('should have dataSource prop', () => {
    expect(wrapper.find({ dataSource: [] })).to.have.length(1)
  })

  it('should have pagination prop', () => {
    expect(wrapper.find({ pagination: {
      pageSize: 30,
      current: 1,
      total: 100,
    }})).to.have.length(1)
  })

  it('should render Filters component', () => {
    expect(wrapper.find(Filters)).to.have.length(1)
  })

  it('should render UserCard component', () => {
    expect(wrapper.find(UserCard)).to.have.length(1)
  })

  it('should render antd List component', () => {
    expect(wrapper.find(List)).to.have.length(1)
  })

  it('should trigger page change event when user clicks', () => {
    const wrapper = mount(<StarredReposList {...props}/>)
    wrapper.find('.ant-pagination a').last().simulate('click')
    expect(props.updateField.calledWith('page', 2)).to.equal(true)
  })

  it('should fetch starred repos when user clicks', () => {
    const wrapper = mount(<StarredReposList {...props}/>)
    wrapper.find('.ant-pagination a').last().simulate('click')
    expect(props.searchGithubUserStarredRepos.calledWith('test')).to.equal(true)
  })
})
