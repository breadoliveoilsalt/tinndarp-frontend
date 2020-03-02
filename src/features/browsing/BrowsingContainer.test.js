import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import BrowsingContainerConnectedToStore, { BrowsingContainer } from './BrowsingContainer'
import CurrentItemContainer from './CurrentItemContainer'

const mockStore = configureMockStore([thunk])

describe("<BrowsingContainer />", () => {

  it("does not render <CurrentItemContainer/ > if the store has no list of items", () => {
    const state = {itemsToBrowse:
                    {items: null}
                  }
    const store = mockStore(state)
    const wrapper = mount(<Provider store={store}> <BrowsingContainerConnectedToStore /> </Provider>)

    expect(wrapper.find(CurrentItemContainer).exists()).toBeFalsy()
  })

  it("renders <CurrentItemContainer/ > if the store has a list of items", () => {
    const state = {itemsToBrowse:
                    {items: ["item 1"]}
                  }
    const store = mockStore(state)
    const wrapper = mount(<Provider store={store}> <BrowsingContainerConnectedToStore /> </Provider>)

    expect(wrapper.find(CurrentItemContainer).exists()).toBeTruthy()
  })

  it("calls fetchItems when it mounts", () => {
    const props = {fetchItems: jest.fn()}
    const wrapper = shallow(<BrowsingContainer {...props} />)

    expect(props.fetchItems.mock.calls.length).toEqual(1)

  })

})
