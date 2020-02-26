import React from "react"
import App from "./App"
import Header from "./Header"
import BrowsingContainer from "../features/browsing/BrowsingContainer"
import Enzyme, { shallow } from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe("<App />", () => {

  it("renders a div with a className of 'App'", () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find("div.app")).toHaveLength(1)
  })

  it("renders a <Header /> component", () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find(Header)).toHaveLength(1)
  })

  it("renders a <BrowsingContainer /> component", () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find(BrowsingContainer)).toHaveLength(1)
  })
})
