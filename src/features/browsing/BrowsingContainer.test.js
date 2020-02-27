import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import BrowsingContainer from './BrowsingContainer'
import CurrentItemContainer from './CurrentItemContainer'

const mockStore = configureStore({reducer: () => {}})

describe("<BrowsingContainer />", () => {

  it("renders <CurrentItemContainer/ >", () => {
    const wrapper = mount(<Provider store={mockStore}> <BrowsingContainer /> </Provider>)

    expect(wrapper.find(CurrentItemContainer)).toHaveLength(1)
  })
})
