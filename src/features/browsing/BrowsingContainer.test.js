import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import configureMockStore from 'redux-mock-store'

import BrowsingContainer from './BrowsingContainer'
import CurrentItemContainer from './CurrentItemContainer'

const mockStore = configureMockStore([thunk])

describe("<BrowsingContainer />", () => {

  it("does not render <CurrentItemContainer/ > if the store has no list of items", () => {
    const store = mockStore({})
    const wrapper = mount(<Provider store={store}> <BrowsingContainer /> </Provider>)

    expect(wrapper.find(CurrentItemContainer).isEmpty()).toBeTruthy()
  })

  it("renders <CurrentItemContainer/ > if the store has a list of items", () => {
    const store = mockStore({itemsToBrowse: ["item 1"]})
    const wrapper = mount(<Provider store={store}> <BrowsingContainer /> </Provider>)

    expect(wrapper.find(CurrentItemContainer).exists()).toBeTruthy()
  })
})
