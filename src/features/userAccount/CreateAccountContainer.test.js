import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import CreateAccountContainerConnectedToStore, { CreateAccountContainer } from './CreateAccountContainer'
import AccountForm from './AccountForm'

describe("<CreateAccountContainer />", () => {

  let mockStore

  beforeEach(() => {
    mockStore = configureMockStore([thunk])
  })

  // it("renders an <AccountForm />", () => {
  //   const wrapper = shallow(<CreateAccountContainer />)
  //
  //   expect(wrapper.find(AccountForm).length).toEqual(1)
  // })

  it("renders any errors present in the state", () => {
    const state =
      { userAccount:
        { errors: ["Invalid email format", "Email too short"] }
      }

    const store = mockStore(state)

    const wrapper = mount(<CreateAccountContainerConnectedToStore store={store} />)

    // const errors = wrapper.find(".error")
    //
    // expect(errors.length).toEqual(2)
    // expect(errors.at(0).text()).toEqual("Invalid email format")
    // expect(errors.at(1).text()).toEqual("Email too short")
  })

})
