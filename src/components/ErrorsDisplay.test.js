import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ErrorsDisplay from './ErrorsDisplay'

Enzyme.configure({ adapter: new Adapter() })

describe("<ErrorsDisplay />", () => {

  it("lists all the errors passed in via props", () => {
    const props = {
      errors: ["problem 1", "problem 2"]
    }
    const wrapper = shallow(<ErrorsDisplay {...props} />)

    const errors = wrapper.find("div.error")

    expect(errors.length).toEqual(2)
    expect(errors.at(0).text()).toEqual("problem 1")
    expect(errors.at(1).text()).toEqual("problem 2")
  })

})
