import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import Header from './Header'
import Logo from './Logo'
import Divider from './Divider'
import AccountStatusHeader from '../features/userAccount/AccountStatusHeader'

describe("<Header />", () => {

  it("renders <Logo /> with a 'logo-header' className", () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.find(Logo)).toHaveLength(1)
    expect(wrapper.find(Logo).hasClass("logo-header")).toBeTruthy()
  })

  it("renders <Divider /> with a 'divider' className", () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.find(Divider)).toHaveLength(1)
    expect(wrapper.find(Divider).hasClass("divider")).toBeTruthy()
  })

  it("renders <AccountStatusHeader />", () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.find(AccountStatusHeader)).toHaveLength(1)
  })
})
