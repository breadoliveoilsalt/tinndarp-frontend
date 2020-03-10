import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { MemoryRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from '../configureStore'
import RoutesContainer from './RoutesContainer'
import Home from './Home'
import CreateAccountContainer from '../features/userAccount/CreateAccountContainer'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import NoMatch from './NoMatch'

const store = configureStore()

describe("<Routes />", () => {

  it("renders <Switch />", () => {
    const wrapper = shallow(<RoutesContainer />)

    expect(wrapper.find(Switch)).toHaveLength(1)
  })

  it("renders <Switch /> with different possible <Routes />, given a shallow rendering", () => {
    const wrapper = shallow(<RoutesContainer />)

    expect(wrapper.find(Route).length).toBeGreaterThan(1)
  })

  it("renders only a <Route /> with <Home /> when the route is '/'", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
          <RoutesContainer />
        </MemoryRouter>
      </Provider>
    )

    const routeComponent = wrapper.find(Route)
    const homeComponent = wrapper.find(Home)
    expect(routeComponent.children().length).toEqual(1)
    expect(routeComponent.children()).toEqual(homeComponent)
  })

  it("renders only a <Route /> with <CreateAccountContainer /> when the route is '/sign_up'", () => {
    const wrapper = mount(
      <Provider store={store} >
        <MemoryRouter initialEntries={[ '/sign_up' ]} initialIndex={0}>
          <RoutesContainer />
        </MemoryRouter>
      </Provider>
    )

    const routeComponent = wrapper.find(Route)
    const createAccountContainerComponent = wrapper.find(CreateAccountContainer)
    expect(routeComponent.children().length).toEqual(1)
    expect(routeComponent.children()).toEqual(createAccountContainerComponent)
  })

  it("renders only a <Route /> with <BrowsingContainer /> when the route is '/browse'", () => {
    const wrapper = mount(
      <Provider store={store} >
        <MemoryRouter initialEntries={[ '/browse' ]} initialIndex={0}>
          <RoutesContainer />
        </MemoryRouter>
      </Provider>
    )

    const routeComponent = wrapper.find(Route)
    const browsingContainerComponent = wrapper.find(BrowsingContainer)
    expect(routeComponent.children().length).toEqual(1)
    expect(routeComponent.children()).toEqual(browsingContainerComponent)
  })

  it("renders only a <Route /> with <NoMatch /> when the route does not match any other routes", () => {
    const wrapper = mount(
      <Provider store={store} >
        <MemoryRouter initialEntries={[ '/adlkjfasl' ]} initialIndex={0}>
          <RoutesContainer />
        </MemoryRouter>
      </Provider>
    )

    const routeComponent = wrapper.find(Route)
    const noMatchComponent = wrapper.find(NoMatch)
    expect(routeComponent.children().length).toEqual(1)
    expect(routeComponent.children()).toEqual(noMatchComponent)
  })

})
