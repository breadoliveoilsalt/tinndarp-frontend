import React from 'react'
import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import CreateAccountContainer from './CreateAccountContainer'

describe("<CreateAccountContainer />", () => {

  it("has two input tags", () => {
    const wrapper = shallow(CreateAccountContainer)

    expect(wrapper.find("input").length).toEqual(2)
  }
})
