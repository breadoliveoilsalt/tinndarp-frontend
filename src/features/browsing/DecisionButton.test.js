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
    expect(wrapper.find("button")).toHaveLength(1)
  })

  describe("the rendered button", () => {

    it("renders the text prop", () => {
      const buttonText = "Button Text"
      props = {text: buttonText}

      wrapper = shallow(<DecisionButton {...props} />)

      expect(wrapper.find("button").text()).toEqual(buttonText)
    })

    it("has a className from props.className", () => {
      const buttonClassName ="action-button nope-button"

      props = {className: buttonClassName}
      wrapper = shallow(<DecisionButton {...props} />)

      expect(wrapper.find("button").props().className).toEqual(buttonClassName)
    })

    it("on a click, calls the callback passed down as props.action", () => {
      props = {action: jest.fn()}
      wrapper = shallow(<DecisionButton {...props} />)
      const button = wrapper.find("button")

      button.simulate("click")

      expect(props.action.mock.calls.length).toEqual(1)
    })

  })

})
