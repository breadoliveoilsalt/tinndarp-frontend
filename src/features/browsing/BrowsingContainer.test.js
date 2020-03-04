import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import BrowsingContainerConnectedToStore, { BrowsingContainer } from './BrowsingContainer'
import CurrentItemContainer from './CurrentItemContainer'
import Loader from '../../components/Loader'
import FinishedBrowsingDisplay from './FinishedBrowsingDisplay'

const mockStore = configureMockStore([thunk])

describe("<BrowsingContainer />", () => {

  it("does not render <CurrentItemContainer /> if the store has no list of items", () => {
    const state = {itemsToBrowse:
                    {items: null}
                  }
    const store = mockStore(state)
    const wrapper = mount(<Provider store={store}> <BrowsingContainerConnectedToStore /> </Provider>)

    expect(wrapper.find(CurrentItemContainer).exists()).toBeFalsy()
  })

  it("renders <CurrentItemContainer /> if the store has a list of items and the app is not fetchingItems", () => {
    const state = {itemsToBrowse:
                    { items: ["item 1"],
                      fetchingItems: false
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(<Provider store={store}> <BrowsingContainerConnectedToStore /> </Provider>)

    expect(wrapper.find(CurrentItemContainer).exists()).toBeTruthy()
  })

  it("renders <CurrentItemContainer /> with props for its own currentItem prop, its handleNope, and its handleLike", () => {
    const state = {itemsToBrowse:
                    { items: ["item 1"],
                      currentItem: "item 1"
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(<Provider store={store}> <BrowsingContainerConnectedToStore /> </Provider>)

    expect(wrapper.find(CurrentItemContainer).prop("currentItem")).toEqual("item 1")


  })

  it("calls fetchItems when it mounts", () => {
    const props = {fetchItems: jest.fn()}
    const wrapper = shallow(<BrowsingContainer {...props} />)

    expect(props.fetchItems.mock.calls.length).toEqual(1)
  })

  it("renders a Loader if the app is fetching items", () => {
    const state = {itemsToBrowse:
                    {fetchingItems: true}
                  }
    const store = mockStore(state)
    const wrapper = mount(<Provider store={store}> <BrowsingContainerConnectedToStore /> </Provider>)

    expect(wrapper.find(Loader).exists()).toBeTruthy()
  })

  it("renders a Loader if the app is fetching items and there are items already", () => {
    const state = {itemsToBrowse:
                    { fetchingItems: true,
                      items: ["item 1"]
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(<Provider store={store}> <BrowsingContainerConnectedToStore /> </Provider>)

    expect(wrapper.find(Loader).exists()).toBeTruthy()
  })

  it("renders an <FinishedBrowsingDisplay /> if the state's items list is empty and the app is not fetching", () => {
    const state = {itemsToBrowse:
                    { fetchingItems: false,
                      items: []
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(<Provider store={store}> <BrowsingContainerConnectedToStore /> </Provider>)

    expect(wrapper.find(FinishedBrowsingDisplay).exists()).toBeTruthy()
  })

  describe("handleNope()", () => {
    let props
    beforeEach(() => {
      props = {
        removeCurrentItem: jest.fn(),
        updateCurrentItem: jest.fn(),
        fetchItems: jest.fn()
      }
    })

    it("calls the removeCurrentItem action", () => {
      const wrapper = shallow(<BrowsingContainer {...props} />)

      wrapper.instance().handleNope()

      expect(props.removeCurrentItem.mock.calls.length).toEqual(1)
    })

    it("calls the updateCurrentItem action", () => {
      const wrapper = shallow(<BrowsingContainer {...props} />)

      wrapper.instance().handleNope()

      expect(props.updateCurrentItem.mock.calls.length).toEqual(1)
    })

  })
})
