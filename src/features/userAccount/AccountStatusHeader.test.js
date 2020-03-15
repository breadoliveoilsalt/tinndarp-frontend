import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Link, BrowserRouter, MemoryRouter } from 'react-router-dom'
import * as userAccountActions from './userAccountSlice'
import AccountStatusHeaderConnectedToStore, { AccountStatusHeader } from './AccountStatusHeader'

describe("<AccountStatusHeader />", () => {
  const TINNDARP_TOKEN_KEY = 'tinndarp_token'

  const customMount = (store) => {
    return mount(
      <Provider store={store} >
        <BrowserRouter>
          <AccountStatusHeaderConnectedToStore />
        </BrowserRouter>
      </Provider>
    )
  }

  let mockStore
  beforeEach(() => {
    mockStore = configureMockStore([thunk])
  })

  afterEach(() => {
    window.localStorage.removeItem(TINNDARP_TOKEN_KEY)
  })

  it("renders a button to 'Sign Out' if the user has a token", () => {
    window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")
    const store = mockStore({})

    const wrapper = customMount(store)

    expect(wrapper.find("button#sign-out-button-header").length).toEqual(1)
    expect(wrapper.find("button#sign-out-button-header").text()).toEqual("Sign Out")
  })

  it("renders a button to 'Sign Out' if the user does not have a token saved", () => {
    const store = mockStore({})
    window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")

    const wrapper = customMount(store)

    expect(wrapper.find("button#sign-out-button-header").length).toEqual(1)
    expect(wrapper.find("button#sign-out-button-header").text()).toEqual("Sign Out")
  })

  it("redners a <Link /> to the home page for logging in or signin up", () => {
    const state = {userAccount: {loggedIn: false}}
    const store = mockStore(state)

    const wrapper = customMount(store)

    const link = wrapper.find("Link")

    expect(link.length).toEqual(1)
    expect(link.text()).toEqual("Please Log In or Sign Up")
    expect(link.prop("to")).toEqual("/")
  })

  describe("signOut()", () => {

    it("calls deleteToken()", () => {
      userAccountActions.deleteToken = jest.fn()
      const props = {
        history: {push: jest.fn()},
        updateLoggedInStatus: jest.fn()
      }

      const wrapper = shallow(<AccountStatusHeader {...props} />)

      wrapper.instance().signOut()

      expect(userAccountActions.deleteToken.mock.calls.length).toEqual(1)
    })

    it("updates the state's loggedIn status as false", () => {
      userAccountActions.deleteToken = jest.fn()
      const props = {
        history: {push: jest.fn()},
        updateLoggedInStatus: jest.fn()
      }

      const wrapper = shallow(<AccountStatusHeader {...props} />)

      wrapper.instance().signOut()

      expect(wrapper.instance().props.updateLoggedInStatus.mock.calls.length).toEqual(1)
    })

    it("redirects to the home page", () => {
      userAccountActions.deleteToken = jest.fn()
      const props = {
        history: {push: jest.fn()},
        updateLoggedInStatus: jest.fn()
      }
      const wrapper = shallow(<AccountStatusHeader {...props} />)

      wrapper.instance().signOut()

      const argumentPassedToHistoryPush = props.history.push.mock.calls[0][0]

      expect(argumentPassedToHistoryPush).toEqual("/")
    })

  })

})
