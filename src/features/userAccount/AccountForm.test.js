import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import AccountForm from './AccountForm'

describe("the form", () => {

  it("has input fields for a name, password, and submit button", () => {
    const wrapper = shallow(<AccountForm />)

    const inputFields = wrapper.find("form").find("input")

    expect(inputFields.length).toEqual(3)
    expect(inputFields.at(0).prop("name")).toEqual("email")
    expect(inputFields.at(1).prop("name")).toEqual("password")
    expect(inputFields.at(2).prop("type")).toEqual("submit")
  })

  it("calls props.action on clickling submit", () => {
    const props = { action: jest.fn()}
    const wrapper = shallow(<AccountForm {...props} />)
    const form = wrapper.find("form")

    form.simulate("submit")

    expect(props.action.mock.calls.length).toEqual(1)
  })

})
