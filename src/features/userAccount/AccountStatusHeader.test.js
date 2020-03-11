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

  it("renders a link to 'Sign Out' if the state indicates the user is signed in", () => {
    const state = {userAccount: {loggedIn: true}}
    const store = mockStore(state)

    const wrapper = customMount(store)

    expect(wrapper.find("a#sign-out-link").length).toEqual(1)
    expect(wrapper.find("a#sign-out-link").text()).toEqual("Sign Out")
  })

  it("renders a link to 'Sign Out' if the state does not indicate the user is signed in but there is a token saved", () => {
    const state = {userAccount: {loggedIn: false}}
    const store = mockStore(state)
    window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")

    const wrapper = customMount(store)

    expect(wrapper.find("a#sign-out-link").length).toEqual(1)
    expect(wrapper.find("a#sign-out-link").text()).toEqual("Sign Out")

    window.localStorage.removeItem(TINNDARP_TOKEN_KEY)
  })

  it("redners a <Link /> to create an account if the state indicates the user is not signed in", () => {
    const state = {userAccount: {loggedIn: false}}
    const store = mockStore(state)

    const wrapper = customMount(store)

    const link = wrapper.find("Link")

    expect(link.length).toEqual(1)
    expect(link.text()).toEqual("Create an Account")
    expect(link.prop("to")).toEqual("/sign_up")
  })

  describe("signOut()", () => {

    it("calls deleteToken()", () => {
      userAccountActions.deleteToken = jest.fn()
      const props = {history: {push: jest.fn()}}
      const wrapper = shallow(<AccountStatusHeader {...props} />)

      wrapper.instance().signOut()

      expect(userAccountActions.deleteToken.mock.calls.length).toEqual(1)
    })

    it("redirects to the home page", () => {
      userAccountActions.deleteToken = jest.fn()
      const props = {history: {push: jest.fn()}}
      const wrapper = shallow(<AccountStatusHeader {...props} />)

      wrapper.instance().signOut()

      const argumentPassedToHistoryPush = props.history.push.mock.calls[0][0]

      expect(argumentPassedToHistoryPush).toEqual("/")
    })

  })
  
})