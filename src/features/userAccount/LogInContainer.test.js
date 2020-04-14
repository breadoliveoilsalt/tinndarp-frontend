import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import LogInContainerConnectedToStore, { LogInContainer } from './LogInContainer'
import Loader from '../../components/Loader'
import AccountForm from './AccountForm'
import ErrorsDisplay from '../../components/ErrorsDisplay'
import RedirectComponent from './RedirectComponent'
import { BrowserRouter, Link } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

describe("<LogInContainer />", () => {

  let mockStore
  let shallowProps

  beforeEach(() => {
    mockStore = configureMockStore([thunk])
    shallowProps = {
        deleteErrors: jest.fn(),
        logInAction: jest.fn()
      }
  })

  it("calls deleteErrors when mounting", () => {
    const wrapper = shallow(<LogInContainer {...shallowProps} />)

    expect(shallowProps.deleteErrors.mock.calls.length).toEqual(1)
  })

  it("renders only a Loader if the api is fetching", () => {
    const state = {
      apiRequest:
        { fetching: true,
          errors: ["Invalid credentials"] },
      }
    const store = mockStore(state)

    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LogInContainerConnectedToStore  />
        </ BrowserRouter>
      </Provider>)

    expect(wrapper.find(Loader).length).toEqual(1)
    expect(wrapper.find(AccountForm).length).toEqual(0)
    expect(wrapper.find(ErrorsDisplay).length).toEqual(0)
  })

  describe("if a user is not logged in with a token", () => {

    it("renders an <AccountForm />", () => {
      const wrapper = shallow(<LogInContainer {...shallowProps} />)

      expect(wrapper.find(AccountForm).length).toEqual(1)
    })

    it("renders an <ErrorsDisplay /> if there are errors from an apiRequest", () => {
      const state = {
        apiRequest:
          { errors: ["Invalid email format", "Email too short"] },
        }
      const store = mockStore(state)

      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <LogInContainerConnectedToStore />
          </BrowserRouter>
        </Provider>)

      expect(wrapper.find(ErrorsDisplay).length).toEqual(1)
    })

    it("does not render an <ErrorsDisplay /> if there no are errors from an apiRequest", () => {
      const state = {
        apiRequest:
          { errors: null },
        }
      const store = mockStore(state)

      const props = {history: jest.fn()}

      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <LogInContainerConnectedToStore {...props} />
          </ BrowserRouter>
        </Provider>)

      expect(wrapper.find(ErrorsDisplay).length).toEqual(0)
    })
  })

  describe("if a user does have a tinndarp token", () => {

    it("renders a <RedirectComponent /> to /browse", () => {
      window.localStorage.setItem("tinndarp_token", "xyz")
      const state = {
        apiRequest:
          { errors: null },
        }
      const store = mockStore(state)

      const props = {history: jest.fn()}

      const wrapper = mount(
        <Provider store={store}>
          <BrowserRouter>
            <LogInContainerConnectedToStore {...props} />
          </ BrowserRouter>
        </Provider>)

      expect(wrapper.find(RedirectComponent).length).toEqual(1)
      expect(wrapper.find(RedirectComponent).prop("redirectTo")).toEqual("/browse")
    })
  })

  describe("handleLogIn()", () => {
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
        deleteErrors: jest.fn(),
        logInAction: jest.fn()
      }
    })

    it("call preventDefault() on the event", () => {
      const wrapper = shallow(<LogInContainer {...props} />)

      wrapper.instance().handleLogIn(event)

      expect(event.preventDefault.mock.calls.length).toEqual(1)
    })

    it("calls this.props.deleteErrors(), after the component calls it when mounting", () => {
      const wrapper = shallow(<LogInContainer {...props} />)
      expect(props.deleteErrors.mock.calls.length).toEqual(1)

      wrapper.instance().handleLogIn(event)

      expect(props.deleteErrors.mock.calls.length).toEqual(2)
    })

    it("calls this.props.logInAction, passing it the event target's email and password values", () => {
      const wrapper = shallow(<LogInContainer {...props} />)

      wrapper.instance().handleLogIn(event)

      expect(props.logInAction.mock.calls.length).toEqual(1)

      const expectedArgument = {
        email: event.target.email.value,
        password: event.target.password.value
      }

      expect(props.logInAction.mock.calls[0][0]).toEqual(expectedArgument)
    })
  })
})
