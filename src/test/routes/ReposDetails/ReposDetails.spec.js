import React from 'react';
import { Row, Col, Button } from 'antd'
import { browserHistory } from 'react-router'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { ReposDetails } from 'routes/ReposDetails/ReposDetails'

const props = {
  routing: {
    pathname: '/xiaohang/test'
  },
  repository: {
    html_url: 'html_url',
    full_name: 'full_name',
    description: 'description',
    language: 'language',
    license: {
      spdx_id: 'spdx_id'
    },
    subscribers_count: 1,
    stargazers_count: 2,
    forks_count: 3,
    open_issues_count: 4,
  },
  searchGithubRepos: sinon.spy(),
}

const mountWrapper = mount(<ReposDetails {...props}/>)
const shallowWrapper = shallow(<ReposDetails {...props}/>)

describe('<ReposDetails />', () => {
  it('should have a back button', () => {
    expect(shallowWrapper.find(Button)).to.have.length(1)
  })

  it('should go back to the home page when user clicks back button', () => {
    const spyBrowserHistory = sinon.spy(browserHistory, 'push')
    shallowWrapper.find(Button).simulate('click')
    expect(spyBrowserHistory.calledWith('/')).to.equal(true)
  })

  it('should display respository link', () => {
    expect(mountWrapper.find(Row).at(1).find('a[href="html_url"]')).to.have.length(1)
  })

  it('should display respository full name', () => {
    expect(mountWrapper.find(Row).at(1).find('a[href="html_url"]').text()).to.equal('full_name')
  })

  it('should display respository description', () => {
    expect(mountWrapper.find(Row).at(2).find('p').text()).to.equal('description')
  })

  it('should display respository language', () => {
    expect(mountWrapper.find(Row).at(3).find(Col).at(0).find({text: 'language'})).to.have.length(1)
  })

  it('should display respository license', () => {
    expect(mountWrapper.find(Row).at(3).find(Col).at(1).find({text: 'spdx_id'})).to.have.length(1)
  })

  it('should display respository subscribers count', () => {
    expect(mountWrapper.find(Row).at(4).find(Col).at(0).find('span').at(1).text()).to.equal(' 1')
  })

  it('should display respository stargazers count', () => {
    expect(mountWrapper.find(Row).at(4).find(Col).at(1).find('span').at(1).text()).to.equal(' 2')
  })

  it('should display respository forks count', () => {
    expect(mountWrapper.find(Row).at(4).find(Col).at(2).find('span').at(1).text()).to.equal(' 3')
  })

  it('should display respository issues count', () => {
    expect(mountWrapper.find(Row).at(4).find(Col).at(3).find('span').at(1).text()).to.equal(' 4')
  })
})
