import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import CreateAccountContainer from './CreateAccountContainer'

describe("<CreateAccountContainer />", () => {

  it("has a form", () => {
    const wrapper = shallow(<CreateAccountContainer />)

    expect(wrapper.find("form").length).toEqual(1)
  })
})
