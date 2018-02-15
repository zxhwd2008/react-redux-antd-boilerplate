import React from 'react';
import { Input } from 'antd'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SearchBar } from 'components/SearchBar'

const Search = Input.Search

const props = {
  routing: {pathname: '/'},
  updateField: sinon.spy(),
  searchGithubUser: sinon.spy(),
  searchGithubUserStarredRepos: sinon.spy(),
}

const wrapper = shallow(<SearchBar {...props}/>)

describe('<SearchBar />', () => {
  it('should return <div /> if pathname not equal with root', () => {
    const wrapper = shallow(<SearchBar routing={{pathname: '/test'}}/>);
    expect(wrapper.html()).to.equal('<div></div>')
  });

  it('should return <Search /> if pathname equal with root', () => {
    expect(wrapper.find(Search)).to.have.length(1);
  })

  it('should call updateField when user clicks search', () => {
    wrapper.find(Search).simulate('search', 'test');
    expect(props.updateField.calledWith('page', 1)).to.equal(true)
    expect(props.updateField.calledWith('sort', 'created')).to.equal(true)
  })

  it('should call searchGithubUser when user clicks search', () => {
    wrapper.find(Search).simulate('search', 'test');
    expect(props.searchGithubUser.calledWith('test')).to.equal(true)
  })

  it('should call searchGithubUserStarredRepos when user clicks search', () => {
    wrapper.find(Search).simulate('search', 'test');
    expect(props.searchGithubUserStarredRepos.calledWith('test')).to.equal(true)
  })
})
