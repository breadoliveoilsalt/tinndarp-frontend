import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import DecisionButton from './DecisionButton'


describe("<DecisionButton />", () => {

  it("renders a button", () => {
    const wrapper = shallow(<DecisionButton />)
    expect(wrapper.find("button")).toHaveLength(1)
  })
})
