import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ErrorsDisplay from './ErrorsDisplay'

Enzyme.configure({ adapter: new Adapter() })

describe("<ErrorsDisplay />", () => {

  it("lists all the errors in the apiRequest error state", () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({apiRequest: {errors: ["problem 1", "problem 2"] }})
    const wrapper = mount(
      <Provider store={store} >
        <ErrorsDisplay store={store}/>
      </Provider>)

    const errors = wrapper.find("div.error")


    expect(errors.length).toEqual(2)
    expect(errors.at(0).text()).toEqual("problem 1")
    expect(errors.at(1).text()).toEqual("problem 2")
  })

})
