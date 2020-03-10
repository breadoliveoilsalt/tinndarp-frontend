import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import RedirectComponent from './RedirectComponent'

describe("<RedirectComponent />", () => {

  it("renders text passed down as a text prop", () => {
    const props={text: "You are being redirected!"}
    const wrapper = shallow(<RedirectComponent {...props} />)

    expect(wrapper.text()).toEqual(props.text)
  })

  it("renders the Loader", () => {
    const props = {}
    const wrapper = shallow(<RedirectComponent {...props} />)

    expect(wrapper.find(Loader).length).toEqual(1)
  })
})
