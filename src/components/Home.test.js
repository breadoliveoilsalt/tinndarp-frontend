import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import HomeConnectedToStore, { Home } from './Home'

describe("<Home />", () => {

  const TINNDARP_TOKEN_KEY = 'tinndarp_token'
  let mockStore

  beforeEach(() => {
    mockStore = configureMockStore([thunk])
  })

  describe("if the state's logged in status is false", () => {

    it("renders a button for signing up and a button for logging in", () => {
      const state = { userAccount: {loggedIn: false}}
      const store = mockStore(state)
      const wrapper = mount(
        <BrowserRouter>
          <HomeConnectedToStore store={store} />)
        </BrowserRouter>
      )

      expect(wrapper.find("button")).toHaveLength(2)
      expect(wrapper.find("button").at(0).text()).toEqual("Log In")
      expect(wrapper.find("button").at(1).text()).toEqual("Sign Up")
    })

    describe("Clicking the button for logging in", () => {

      it("redirects the user to the /log_in page", () => {
        const state = { userAccount: {loggedIn: false}}
        const store = mockStore(state)
        const wrapper = mount(
          <BrowserRouter>
            <HomeConnectedToStore store={store} />)
          </BrowserRouter>
        )

        wrapper.find("button").at(0).simulate("click")
        expect(window.location.pathname).toEqual("/log_in")
      })

    })

    describe("Clicking the button for signing up", () => {

      it("redirect the user to the /sign_up page", () => {
        const state = { userAccount: {loggedIn: false}}
        const store = mockStore(state)
        const wrapper = mount(
          <BrowserRouter>
            <HomeConnectedToStore store={store} />)
          </BrowserRouter>
        )

        wrapper.find("button").at(1).simulate("click")
        expect(window.location.pathname).toEqual("/sign_up")
      })

    })

  })

  describe("if the user is logged in", () => {

    it("renders a button for browsing", () => {
      const state = { userAccount: {loggedIn: true}}
      const store = mockStore(state)
      const wrapper = mount(
        <BrowserRouter>
          <HomeConnectedToStore store={store} />)
        </BrowserRouter>
      )

      expect(wrapper.find("button").length).toEqual(1)
      expect(wrapper.find("button").text()).toEqual("Browse")
    })

    describe("Clicking the button for browsing", () => {

      it("redirects the user to the /browsing page", () => {
        const state = { userAccount: {loggedIn: true}}
        const store = mockStore(state)
        const wrapper = mount(
          <BrowserRouter>
            <HomeConnectedToStore store={store} />)
          </BrowserRouter>
        )

        wrapper.find("button").simulate("click")
        expect(window.location.pathname).toEqual("/browse")
      })

    })

    describe("the determination of a positive logged in status", () => {
      it("can also be determined by the existence of a token", () => {
        const state = { userAccount: {loggedIn: false}}
        const store = mockStore(state)
        window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")
        const wrapper = mount(
          <Provider store={store}>
            <BrowserRouter>
              <HomeConnectedToStore />
            </BrowserRouter>
          </Provider>
        )

        expect(wrapper.find("button").length).toEqual(1)
        expect(wrapper.find("button").text()).toEqual("Browse")
        window.localStorage.removeItem(TINNDARP_TOKEN_KEY)
      })

    })

  })


})
