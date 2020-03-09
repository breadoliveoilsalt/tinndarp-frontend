import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import CreateAccountContainerConnectedToStore, { CreateAccountContainer } from './CreateAccountContainer'
import AccountForm from './AccountForm'
import ErrorsDisplay from '../apiRequests/ErrorsDisplay'
import { BrowserRouter, Link } from 'react-router-dom'

describe("<CreateAccountContainer />", () => {

  let mockStore

  beforeEach(() => {
    mockStore = configureMockStore([thunk])
  })

  describe("if a user is logged in", () => {

  it("renders a link redirecting the user to the browsing page", () => {
    const state = {
        apiRequest:
          { errors: null },
        userAccount:
          { loggedIn: true }
        }
      const store = mockStore(state)

      const wrapper = mount(<Provider store={store}> <BrowserRouter> <CreateAccountContainerConnectedToStore /> </ BrowserRouter> </Provider>)

      const link = wrapper.find(Link)

      expect(link.length).toEqual(1)
      expect(link.prop("to")).toEqual("/browse")
    })
    
  })

  describe("if a user is not logged in", () => {

    it("renders an <AccountForm />", () => {
      const wrapper = shallow(<CreateAccountContainer />)

      expect(wrapper.find(AccountForm).length).toEqual(1)
    })

    it("renders an <ErrorsDisplay /> if there are errors from an apiRequest", () => {
      const state = {
        apiRequest:
          { errors: ["Invalid email format", "Email too short"] },
        userAccount:
          { loggedIn: false }
        }
      const store = mockStore(state)

      const wrapper = mount(<Provider store={store}> <CreateAccountContainerConnectedToStore /> </Provider>)

      expect(wrapper.find(ErrorsDisplay).length).toEqual(1)
    })

    it("does not render an <ErrorsDisplay /> if there no are errors from an apiRequest", () => {
      const state = {
        apiRequest:
          { errors: null },
        userAccount:
          { loggedIn: false }
        }
      const store = mockStore(state)

      const wrapper = mount(<Provider store={store}> <CreateAccountContainerConnectedToStore /> </Provider>)

      expect(wrapper.find(ErrorsDisplay).length).toEqual(0)
    })
  })
})
