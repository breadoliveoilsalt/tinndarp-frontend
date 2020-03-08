import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import CreateAccountContainer from './CreateAccountContainer'
import AccountForm from './AccountForm'
const mockStore = configureMockStore([thunk])

describe("<CreateAccountContainer />", () => {

  it("renders an <AccountForm />", () => {
    const wrapper = shallow(<CreateAccountContainer />)

    expect(wrapper.find(AccountForm).length).toEqual(1)
  })

  it("renders any errors present in the state", () => {
    const wrapper = shallow(<CreateAccountContainer />)

  })
})
