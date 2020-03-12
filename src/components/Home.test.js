import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

describe("<Home />", () => {

  const TINNDARP_TOKEN_KEY = 'tinndarp_token'
  // let mockStore

  describe("if the state's logged in status is false", () => {

    it("renders a button for signing up and a button for logging in", () => {
      const wrapper = mount(
        <BrowserRouter>
          <Home />)
        </BrowserRouter>
      )

      expect(wrapper.find("button")).toHaveLength(2)
      expect(wrapper.find("button").at(0).text()).toEqual("Log In")
      expect(wrapper.find("button").at(1).text()).toEqual("Sign Up")
    })

    describe("Clicking the button for logging in", () => {

      it("redirects the user to the /log_in page", () => {
        const wrapper = mount(
          <BrowserRouter>
            <Home />)
          </BrowserRouter>
        )

        wrapper.find("button").at(0).simulate("click")
        expect(window.location.pathname).toEqual("/log_in")
      })

    })

    describe("Clicking the button for signing up", () => {

      it("redirect the user to the /sign_up page", () => {
        const wrapper = mount(
          <BrowserRouter>
            <Home />)
          </BrowserRouter>
        )

        wrapper.find("button").at(1).simulate("click")
        expect(window.location.pathname).toEqual("/sign_up")
      })

    })

  })

  describe("if the user is logged in", () => {

    beforeEach(() => {
      window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")
    })

    afterEach(() => {
      window.localStorage.removeItem(TINNDARP_TOKEN_KEY, "xyz")
    })

    it("renders a button for browsing", () => {
      const wrapper = mount(
        <BrowserRouter>
          <Home />)
        </BrowserRouter>
      )

      expect(wrapper.find("button").length).toEqual(1)
      expect(wrapper.find("button").text()).toEqual("Browse")
    })

    describe("Clicking the button for browsing", () => {

      it("redirects the user to the /browsing page", () => {
        const wrapper = mount(
          <BrowserRouter>
            <Home />)
          </BrowserRouter>
        )

        wrapper.find("button").simulate("click")
        expect(window.location.pathname).toEqual("/browse")
      })

    })

    describe("the determination of a positive logged in status", () => {
      it("can also be determined by the existence of a token", () => {
        const wrapper = mount(
          <BrowserRouter>
            <Home />)
          </BrowserRouter>
        )

        expect(wrapper.find("button").length).toEqual(1)
        expect(wrapper.find("button").text()).toEqual("Browse")
      })

    })

  })


})
