import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Link, BrowserRouter, MemoryRouter } from 'react-router-dom'
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

    debugger;
    const link = wrapper.find("Link")

    expect(link.length).toEqual(1)
    expect(link.text()).toEqual("Create an Account")
    expect(link.prop("to")).toEqual("/sign_up")
  })

  // describe("signOut()", () => {
  // })
  // describe("the 'Sign Out' link", () => {
  //   it("calls signOut() when clicked", () => {
  //     const props = {history: {push: jest.fn()}}
  //     window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")
  //     const wrapper = shallow(<AccountStatusHeader {...props} />)
  //     wrapper.signOut = jest.fn()
  //
  //     wrapper.find("a#sign-out-link").props().onClick()
  //     expect(wrapper.signOut.mock.calls.length).toEqual(1)
  //     // debugger;





      // window.localStorage.setItem(TINNDARP_TOKEN_KEY, "xyz")
      // const props = {history: []}
      // const wrapper = shallow(<AccountStatusHeader {...props} />)
      // wrapper.props.history = []
      // wrapper.instance().signOut = jest.fn()
      // console.log(wrapper.instance().signOut)
      // window.localStorage.removeItem(TINNDARP_TOKEN_KEY)

      // const state = {userAccount: {loggedIn: true}}
      // const store = mockStore(state)
      //
      // const wrapper = customMount(store)
      // // had to use arrow function to be able to do this!!!
      // wrapper.signOut = jest.fn()
      // const signOutLink = wrapper.find("a")
      // expect(wrapper.signOut.mock.calls.length).toEqual(1)

      // //
      // signOutLink.simulate("click")
      //
      // console.log(wrapper.instance().signOut)
      // const state = {userAccount: {loggedIn: true}}
      // const store = mockStore(state)
      //
      // const wrapper = customMount(store)
      // console.log(wrapper.signOut)
      // wrapper.instance().signOut = jest.fn()

      // console.log(wrapper.instance())
      //

      // window.localStorage.removeItem(TINNDARP_TOKEN_KEY)
    // })
  // })

  // setTimeout(() => expect(window.location.pathname).toEqual(props.redirectTo), 1000)

})
