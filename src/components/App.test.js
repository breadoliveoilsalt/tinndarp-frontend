import React from 'react'
import App from './App'
import Header from './Header'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import Footer from './Footer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe("<App />", () => {

  it("renders a container div with a className of 'App'", () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find("div.app")).toHaveLength(1)
  })

  it("renders a <Header /> within the container div", () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find("div.app").find(Header)).toHaveLength(1)
  })

  it("renders a <BrowsingContainer /> withing the container div", () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find("div.app").find(BrowsingContainer)).toHaveLength(1)
  })

  it("renders a <Footer /> withing the container div", () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find("div.app").find(Footer)).toHaveLength(1)
  })

})
