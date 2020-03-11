import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Link, MemoryRouter } from 'react-router-dom'
import AccountStatusHeaderConnectedToStore from './AccountStatusHeader'

describe("<AccountStatusHeader />", () => {
  const TINNDARP_TOKEN_KEY = 'tinndarp_token'

  const customMount = (store) => {
    return mount(
      <Provider store={store} >
        <MemoryRouter>
          <AccountStatusHeaderConnectedToStore />
        </MemoryRouter>
      </Provider>
    )
  }

  let mockStore
  beforeEach(() => {
    mockStore = configureMockStore([thunk])
  })

  it("renders link to 'Sign Out' if the state indicates the user is signed in", () => {
    const state = {userAccount: {loggedIn: true}}
    const store = mockStore(state)

    const wrapper = mount(
      <Provider store={store} >
        <MemoryRouter>
          <AccountStatusHeaderConnectedToStore />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find("a").length).toEqual(1)
    expect(wrapper.find("a").text()).toEqual("Sign Out")
  })

  it("renders link to 'Sign Out' if the state does not indicate the user is signed in but there is a token saved", () => {
    const state = {userAccount: {loggedIn: false}}
    const store = mockStore(state)
    window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")

    const wrapper = customMount(store)
    expect(wrapper.find("a").length).toEqual(1)
    expect(wrapper.find("a").text()).toEqual("Sign Out")
  })
  // setTimeout(() => expect(window.location.pathname).toEqual(props.redirectTo), 1000)

})
