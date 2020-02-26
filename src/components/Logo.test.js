import React from "react"
import Header from "./Header"
import Logo from "./Logo"
import logo from "./images/logo.png"
import Enzyme, { shallow } from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe("<Logo />", () => {

  it("renders a div with a className passed down by props", () => {
    const propsClassName = "some-class"
    const wrapper = shallow(<Logo className={propsClassName} />)

    expect(wrapper.find("img")).toHaveLength(1)
    expect(wrapper.find("div").hasClass(propsClassName)).toBeTruthy()
  })

  it("renders an image className passed down by props", () => {
    const propsClassName = "some-class"
    const wrapper = shallow(<Logo className={propsClassName} />)

    expect(wrapper.find("img")).toHaveLength(1)
    expect(wrapper.find("img").hasClass(propsClassName)).toBeTruthy()
  })

  describe("the rendered image", () => {

    it("is the Tinndarp logo", () => {
      const wrapper = shallow(<Logo />)

      expect(wrapper.find("img").prop("src")).toEqual(logo)
    })

  })
  
})
