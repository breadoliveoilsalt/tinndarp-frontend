import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import DecisionButton from './DecisionButton'


describe("<DecisionButton />", () => {

  it("renders a button", () => {
    const props = {}
    const wrapper = shallow(<DecisionButton {...props} />)
    expect(wrapper.find("button")).toHaveLength(1)
  })

  it("renders the text prop within the button", () => {
    const buttonText = "Button Text"
    const props = {text: buttonText}
    const wrapper = shallow(<DecisionButton {...props} />)
    expect(wrapper.find("button").text()).toEqual(buttonText)
  })
})
