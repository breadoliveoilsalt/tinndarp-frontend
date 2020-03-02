import React from 'react'
import Divider from './Divider'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe("<Divier />", () => {

  it("renders a nested div with a className of from props.className", () => {
    const wrapper = shallow(<Divider className="some-class" />)

    expect(wrapper.find("div").first().children().first().props().className).toEqual("some-class")
  })
  
})
