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
  let shallowProps

  beforeEach(() => {
    mockStore = configureMockStore([thunk])
    shallowProps = {
        resetAPIRequestState: jest.fn(),
        submitCreateAccount: jest.fn()
      }
  })

  it("calls resetAPIRequestState when mounting", () => {
    const wrapper = shallow(<CreateAccountContainer {...shallowProps} />)

    expect(shallowProps.resetAPIRequestState.mock.calls.length).toEqual(1)  
  })

  describe("if a user is not logged in", () => {

    it("renders an <AccountForm />", () => {
      const wrapper = shallow(<CreateAccountContainer {...shallowProps} />)

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

      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <CreateAccountContainerConnectedToStore />
          </BrowserRouter>
        </Provider>)

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

      const props = {history: jest.fn()}

      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <CreateAccountContainerConnectedToStore {...props} />
          </ BrowserRouter>
        </Provider>)

      expect(wrapper.find(ErrorsDisplay).length).toEqual(0)
    })
  })

  describe("handleCreateAccount()", () => {
    const userEmail = "someEmail@email.com"
    const userPassword = "password"

    let event
    let props

    beforeEach(() => {
      event = {
        preventDefault: jest.fn(),
        target: {
          email: {value: userEmail},
          password: {value: userPassword}
        }
      }
      props = {
        resetAPIRequestState: jest.fn(),
        submitCreateAccount: jest.fn()
      }
    })

    it("call preventDefault() on the event", () => {
      const wrapper = shallow(<CreateAccountContainer {...props} />)

      wrapper.instance().handleCreateAccount(event)

      expect(event.preventDefault.mock.calls.length).toEqual(1)
    })

    it("calls this.props.resetAPIRequestState(), after the component calls it when mounting", () => {
      const wrapper = shallow(<CreateAccountContainer {...props} />)
      expect(props.resetAPIRequestState.mock.calls.length).toEqual(1)

      wrapper.instance().handleCreateAccount(event)

      expect(props.resetAPIRequestState.mock.calls.length).toEqual(2)
    })

    it("calls this.props.submitCreateAccount, passing it the event target's email and password values", () => {
      const wrapper = shallow(<CreateAccountContainer {...props} />)

      wrapper.instance().handleCreateAccount(event)

      expect(props.submitCreateAccount.mock.calls.length).toEqual(1)

      const expectedArgument = {
        email: event.target.email.value,
        password: event.target.password.value
      }

      expect(props.submitCreateAccount.mock.calls[0][0]).toEqual(expectedArgument)
    })
  })
})
