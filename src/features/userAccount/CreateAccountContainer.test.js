import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import CreateAccountContainer from './CreateAccountContainer'
import AccountForm from './AccountForm'

describe("<CreateAccountContainer />", () => {

  it("renders an <AccountForm />", () => {
    const wrapper = shallow(<CreateAccountContainer />)

    expect(wrapper.find(AccountForm).length).toEqual(1)
  })

})
