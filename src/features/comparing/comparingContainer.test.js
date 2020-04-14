import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ComparingContainerConnectedToStore, { ComparingContainer } from './ComparingContainer'
import ComparingDisplay from './ComparingDisplay'
import Loader from '../../components/Loader'
import * as userAccountActions from '../userAccount/userAccountSlice'

Enzyme.configure({ adapter: new Adapter() })

describe("<ComparingContainer />", () => {

  let mockStore

  beforeEach(() => {
    mockStore = configureMockStore([thunk])
  })

  it("renders a <Loader /> if the app is fetching", () => {
    const store = mockStore({
      apiRequest: {
        fetching: true,
        errors: null
      },
      comparing: {
        commonItems: [],
        comparedTo: null
      }
    })

    const wrapper = mount(
      <ComparingContainerConnectedToStore store={store} />
    )

    expect(wrapper.find(Loader).length).toEqual(1)
  })

  it("renders a <ComparingDisplay /> if the app is not fetching", () => {
    const store = mockStore({
      apiRequest: {
        fetching: false,
        errors: null
      },
      comparing: {
        commonItems: [],
        comparedTo: null
      }
    })

    const wrapper = mount(
      <ComparingContainerConnectedToStore store={store} />
    )

    expect(wrapper.find(Loader).length).toEqual(0)
    expect(wrapper.find(ComparingDisplay).length).toEqual(1)
  })

  describe("<ComparingDisplay/>", () => {
    it("passes handleComparison() as a prop to <ComparingDisplay/>", () => {
      const store = mockStore({
        apiRequest: {
          fetching: false,
          errors: null
        },
        comparing: {
          commonItems: [],
          comparedTo: null
        }
      })

      const wrapper = mount(
        <ComparingContainerConnectedToStore store={store} />
      )

      const comparingContainerParent = wrapper.find(ComparingContainer)
      const comparingDisplay = wrapper.find(ComparingDisplay)

      expect(comparingDisplay.prop("handleComparison")).toEqual(comparingContainerParent.instance().handleComparison)
    })
  })

  describe("handleComparison()", () => {

    let props
    beforeEach(() => {
      props = {
        deleteErrors: jest.fn(),
        getItemsInCommonWithAction: jest.fn(),
      }
      userAccountActions.getToken = jest.fn()
      userAccountActions.getToken.mockReturnValue("xyz")
    })

    afterEach(() => {
      props.deleteErrors.mockRestore()
      props.getItemsInCommonWithAction.mockRestore()
      userAccountActions.getToken.mockRestore()
    })

    it("deletes any prior errors in the state", () => { const wrapper = shallow(<ComparingContainer {...props} />)

      const event = {
        preventDefault: () => true,
        target: {
          email: "bobby@bobby.com"
        }
      }

      wrapper.instance().handleComparison(event)

      expect(props.deleteErrors.mock.calls.length).toEqual(1)
    })

    it("passes the token and email to getItemsInCommonWithAction", () => { const wrapper = shallow(<ComparingContainer {...props} />)

      const event = {
        preventDefault: () => true,
        target: {
          email: {
            value: "bobby@bobby.com"
          }
        }
      }

      wrapper.instance().handleComparison(event)

      expect(props.getItemsInCommonWithAction.mock.calls.length).toEqual(1)
      expect(props.getItemsInCommonWithAction.mock.calls[0][0]).toEqual({
        compare_to: event.target.email.value,
        token: "xyz"
      })
    })
    
  })
})