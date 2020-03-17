import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { BrowserRouter, Link } from 'react-router-dom'
import RedirectComponent from './RedirectComponent'
import Loader from '../../components/Loader'

describe("<RedirectComponent />", () => {

  it("renders text passed down as a text prop within a paragraph tag", () => {
    const props={text: "You are being redirected!"}
    const wrapper = mount(
      <BrowserRouter>
        <RedirectComponent {...props} />
      </BrowserRouter>)

    expect(wrapper.find("p").text()).toEqual(props.text)
  })

  it("renders the Loader", () => {
    const props = {}
    const wrapper = mount(
      <BrowserRouter>
        <RedirectComponent {...props} />
      </BrowserRouter>)

    expect(wrapper.find(Loader).length).toEqual(1)
  })

  it("redirects to the redirectTo prop within the time given", () => {
    const props = {
      millisecondsToRedirect: 500,
      redirectTo: "/browse"
    }
    const wrapper = mount(
      <BrowserRouter>
        <RedirectComponent {...props} />
      </BrowserRouter>)

    setTimeout(() => expect(window.location.pathname).toEqual(props.redirectTo), 1000)
  })

})
