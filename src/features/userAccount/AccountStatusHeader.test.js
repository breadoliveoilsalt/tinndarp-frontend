import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {  BrowserRouter } from 'react-router-dom'
import AccountStatusHeaderConnectedToStore, { AccountStatusHeader } from './AccountStatusHeader'

Enzyme.configure({ adapter: new Adapter() })

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

  it("renders a button to 'Sign Out' if the user has a token and is loggedIn", () => {
    window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")
    const state = {userAccount: {loggedIn: true, userEmail: null}}
    const store = mockStore(state)

    const wrapper = customMount(store)

    expect(wrapper.find("button#sign-out-button-header").length).toEqual(1)
    expect(wrapper.find("button#sign-out-button-header").text()).toEqual("Sign Out Here")
  })

  it("redners a <Link /> to the home page for logging in or signin up if the user does not have a token or is not logged in", () => {
    const state = {userAccount: {loggedIn: false, userEmail: null}}
    const store = mockStore(state)

    const wrapper = customMount(store)

    const link = wrapper.find("Link")

    expect(link.length).toEqual(1)
    expect(link.text()).toEqual("Please Log In or Sign Up")
    expect(link.prop("to")).toEqual("/")
  })

  describe("signOut()", () => {

    let props
    beforeEach(() => {
      props = {
        history: {push: jest.fn()},
        signOutAction: jest.fn()
      }
    })

    afterEach(() => {
      props.history.push.mockRestore()
      props.signOutAction.mockRestore()
    })
    
    it("calls signOutAction()", () => {

      const props = {
        history: {push: jest.fn()},
        signOutAction: jest.fn()
      }

      const wrapper = shallow(<AccountStatusHeader {...props} />)

      wrapper.instance().signOut()

      expect(props.signOutAction.mock.calls.length).toEqual(1)
    })

    it("redirects to the home page", () => {
      const wrapper = shallow(<AccountStatusHeader {...props} />)

      wrapper.instance().signOut()

      const argumentPassedToHistoryPush = props.history.push.mock.calls[0][0]

      expect(argumentPassedToHistoryPush).toEqual("/")
    })

  })

})
