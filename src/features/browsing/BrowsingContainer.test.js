import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import BrowsingContainerConnectedToStore, { BrowsingContainer } from './BrowsingContainer'
import RedirectComponent from '../userAccount/RedirectComponent'
import CurrentItemContainer from './CurrentItemContainer'
import Loader from '../../components/Loader'
import FinishedBrowsingDisplay from './FinishedBrowsingDisplay'
import * as userAccountActions from '../userAccount/userAccountSlice'

Enzyme.configure({ adapter: new Adapter() })

describe("<BrowsingContainer />", () => {

  let mockStore

  beforeEach(() => {
    mockStore = configureMockStore([thunk])
  })

  it("renders a RedirectComponent and no CurrentItemContainer if there are errors", () => {
    const state = { apiRequest: {
                    fetching: false,
                    errors: ["Error logging in"]
                  },
                  browsing: {
                    items: ["item 1", "item 2"]}
                  }
    const store = mockStore(state)
    const wrapper = mount(
      <MemoryRouter>
        <BrowsingContainerConnectedToStore store={store} />)
      </MemoryRouter>
    )

    expect(wrapper.find(CurrentItemContainer).length).toEqual(0)
    expect(wrapper.find(RedirectComponent).length).toEqual(1)
  })

  it("does not render <CurrentItemContainer /> if the store has no list of items", () => {
    const state = { apiRequest: {
                    fetching: false
                  },
                  browsing: {
                    items: null}
                  }
    const store = mockStore(state)
    const wrapper = mount(
      <MemoryRouter>
        <BrowsingContainerConnectedToStore store={store} />)
      </MemoryRouter>
    )

    expect(wrapper.find(CurrentItemContainer).exists()).toBeFalsy()
  })

  it("renders <CurrentItemContainer /> if the store has a list of items and the app is not fetching", () => {
    const state = {
                    apiRequest: {
                      fetching: false
                    },
                    browsing: {
                      items: ["item 1", "item 2"]
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(
      <MemoryRouter>
        <BrowsingContainerConnectedToStore store={store} />)
      </MemoryRouter>
    )

    expect(wrapper.find(CurrentItemContainer).exists()).toBeTruthy()
  })

  it("renders <CurrentItemContainer /> with props for its own currentItem prop, its handleNope, and its handleLike", () => {
    const state = {
                    apiRequest: {
                      fetching: false
                    },
                    browsing: {
                      items: ["item 1"],
                      currentItem: "item 1"
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(
      <MemoryRouter>
        <BrowsingContainerConnectedToStore store={store} />)
      </MemoryRouter>
    )

    const browsingContainerParent = wrapper.find(BrowsingContainer)
    const currentItemContainer = wrapper.find(CurrentItemContainer)

    expect(currentItemContainer.prop("currentItem")).toEqual("item 1")
    expect(currentItemContainer.prop("handleNope")).toEqual(browsingContainerParent.instance().handleNope)
    expect(currentItemContainer.prop("handleLike")).toEqual(browsingContainerParent.instance().handleLike)
  })

  it("calls fetchItems when it mounts", () => {
    const props = {fetchItems: jest.fn()}
    const wrapper = shallow(<BrowsingContainer {...props} />)

    expect(props.fetchItems.mock.calls.length).toEqual(1)
    props.fetchItems.mockRestore()  
  })

  it("renders a Loader if the app is fetching items", () => {
    const state = {
                    apiRequest: {
                      fetching: true
                    },
                    browsing: {
                      items: ["item 1"]
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(<BrowsingContainerConnectedToStore store={store} />)

    expect(wrapper.find(Loader).exists()).toBeTruthy()
  })

  it("renders a Loader if the app is fetching items and there are items already", () => {
    const state = {
                    apiRequest: {
                      fetching: true,
                    },
                    browsing: {
                      items: ["item 1"]
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(<BrowsingContainerConnectedToStore store={store} />)

    expect(wrapper.find(Loader).exists()).toBeTruthy()
  })

  it("renders an <FinishedBrowsingDisplay /> if the state's items list is empty and the app is not fetching", () => {
    const state = {
                    apiRequest: {
                      fetching: false,
                    },
                    browsing: {
                      items: []
                    }
                  }
    const store = mockStore(state)
    const wrapper = mount(
      <MemoryRouter>
        <BrowsingContainerConnectedToStore store={store} />)
      </MemoryRouter>
    )

    expect(wrapper.find(FinishedBrowsingDisplay).exists()).toBeTruthy()
  })

  describe("handleLike()", () => {

    let props
    beforeEach(() => {
      props = {
        fetchItems: jest.fn(),
        postBrowsingDecisionAction: jest.fn(),
        currentItem: {id: 1}
      }
      userAccountActions.getToken = jest.fn()
      userAccountActions.getToken.mockReturnValue("xyz")
    })

    afterEach(() => {
      props.fetchItems.mockRestore()
      props.postBrowsingDecisionAction.mockRestore()
      userAccountActions.getToken.mockRestore()
    })

    it("calls postBrowsingDecisionAction", () => {
      const wrapper = shallow(<BrowsingContainer {...props} />)

      wrapper.instance().handleLike()

      expect(props.postBrowsingDecisionAction.mock.calls.length).toEqual(1)
    })

    it("passes an object to  postBrowsingDecisionAction with the result of getToken, the currentItem id, and a liked status set to true", () => {
      const wrapper = shallow(<BrowsingContainer {...props} />)

      wrapper.instance().handleLike()

      const expectedResult = {
        token: "xyz",
        item_id: props.currentItem.id,
        liked: true
      }  
      expect(props.postBrowsingDecisionAction.mock.calls[0][0]).toEqual(expectedResult)
    })
  })

  describe("handleNope()", () => {

    let props
    beforeEach(() => {
      props = {
        fetchItems: jest.fn(),
        postBrowsingDecisionAction: jest.fn(),
        currentItem: {id: 1}
      }
      userAccountActions.getToken = jest.fn()
      userAccountActions.getToken.mockReturnValue("xyz")
    })

    afterEach(() => {
      props.fetchItems.mockRestore()
      props.postBrowsingDecisionAction.mockRestore()
      userAccountActions.getToken.mockRestore()
    })

    it("calls postBrowsingDecisionAction", () => {
      const wrapper = shallow(<BrowsingContainer {...props} />)

      wrapper.instance().handleLike()

      expect(props.postBrowsingDecisionAction.mock.calls.length).toEqual(1)
    })

    it("passes an object to  postBrowsingDecisionAction with the result of getToken, the currentItem id, and a liked status set to false", () => {
      const wrapper = shallow(<BrowsingContainer {...props} />)

      wrapper.instance().handleNope()

      const expectedResult = {
        token: "xyz",
        item_id: props.currentItem.id,
        liked: false
      }  
      expect(props.postBrowsingDecisionAction.mock.calls[0][0]).toEqual(expectedResult)
    })
  })
})
