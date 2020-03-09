import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import ErrorsDisplay from './ErrorsDisplay'

describe("<ErrorsDisplay />", () => {

  it("lists all the errors in the apiRequest error state", () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({apiRequest: {errors: ["problem 1", "problem 2"] }})
    const wrapper = mount(
      <Provider store={store} >
        <ErrorsDisplay store={store}/>
      </Provider>)

      // it("renders any errors in the state from an api request", () => {
      //   const state =
      //     { apiRequest:
      //       { errors: ["Invalid email format", "Email too short"] }
      //     }
      //
      //   const store = mockStore(state)
      //
      //   const wrapper = mount(<CreateAccountContainerConnectedToStore store={store} />)
      //
      //   console.log(wrapper.debug())
      //   const errors = wrapper.find("div.error")
      //
      //   expect(errors.length).toEqual(2)
      //   expect(errors.at(0).text()).toEqual("Invalid email format")
      //   expect(errors.at(1).text()).toEqual("Email too short")
      // })
      //
  })

})
