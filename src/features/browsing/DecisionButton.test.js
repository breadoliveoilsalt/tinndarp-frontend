import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import DecisionButton from './DecisionButton'


describe("<DecisionButton />", () => {

  let wrapper
  let props = {}

  beforeEach(() => {
    wrapper = shallow(<DecisionButton {...props} />)
  })

  it("renders a button", () => {
    const props = {}
    const wrapper = shallow(<DecisionButton {...props} />)
    expect(wrapper.find("button")).toHaveLength(1)
  })

  describe("the rendered button", () => {

    it("renders the text prop within the button", () => {
      const buttonText = "Button Text"
      const props = {text: buttonText}
      const wrapper = shallow(<DecisionButton {...props} />)
      expect(wrapper.find("button").text()).toEqual(buttonText)
    })

    it("has a className of 'decision-button'", () => {
      const wrapper = shallow(<DecisionButton {...props} />)
      expect(wrapper.find("button").props().className).toEqual("decision-button")
    })

  })

})
