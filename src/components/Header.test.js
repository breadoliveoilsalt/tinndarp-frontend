import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from './Header'
import HeaderLogoLink from './HeaderLogoLink'
import NavBar from './NavBar'
import AccountStatusHeader from '../features/userAccount/AccountStatusHeader'

Enzyme.configure({ adapter: new Adapter() })

describe("<Header />", () => {

  it("renders <HeaderLogoLink />", () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.find(HeaderLogoLink)).toHaveLength(1)
  })

  it("renders <AccountStatusHeader />", () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.find(AccountStatusHeader)).toHaveLength(1)
  })

  it("renders <NavBar />", () => {
    const wrapper = shallow(<Header />)

    expect(wrapper.find(NavBar)).toHaveLength(1)
  })
})
