import React from 'react';
import { Card } from 'antd'
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { UserCard } from 'routes/GithubStarredManager/UserCard'

const { Meta } = Card

const props = {
  user: {
    name: 'name',
    avatar_url: 'avatar_url',
    bio: 'bio'
  },
}

const wrapper = mount(<UserCard {...props}/>)

describe('<UserCard />', () => {
  it('should render antd Card component', () => {
    expect(wrapper.find(Card)).to.have.length(1)
  })

  it('should render antd Meta component', () => {
    expect(wrapper.find(Meta)).to.have.length(1)
  })

  it('should display user avatar', () => {
    expect(wrapper.find('img[src="avatar_url"]')).to.have.length(1)
  })

  it('should display user name', () => {
    expect(wrapper.find('.ant-card-meta-title').text()).to.equal('name')
  })

  it('should display user bio', () => {
    expect(wrapper.find('.ant-card-meta-description').text()).to.equal('bio')
  })
})
