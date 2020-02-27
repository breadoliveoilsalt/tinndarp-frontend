import React from 'react'
import BrowsingContainer from './BrowsingContainer'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

describe("<BrowsingContainer />", () => {

  const store = configureStore()

  it("renders <CurrentItemContainer/ >", () => {
    const wrapper = shallow(<Provider store={store}> <BrowsingContainer /> </Provider>).dive()

    expect(wrapper.find(CurrentItemContainer)).toHaveLength(1)
  })
})
