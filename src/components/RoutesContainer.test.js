import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import { MemoryRouter, Switch, Route } from 'react-router-dom'
import RoutesContainer from './RoutesContainer'

describe("<Routes />", function() {

  it("renders the Switch Component", function(){
    const wrapper = shallow(<RoutesContainer />)

    expect(wrapper.find(Switch)).toHaveLength(1)
  })

  it("renders the Switch component with three Route components on a shallow render", function() {
    const wrapper = shallow(<RoutesContainer />)

    expect(wrapper.find(Route).length).toBeGreaterThan(1)
  })

  // it("renders only the SearchLayoutAndLogic component when the route is '/'", function(){
  //
  //   let store = configureStore()
  //
  //   const wrapper = mount(
  //     <Provider store={store} >
  //       <MemoryRouter exact initialEntries={[ '/' ]}>
  //         <Routes />
  //       </MemoryRouter>
  //     </ Provider>
  //   )
  //
  //   expect(wrapper.find(SearchLayoutAndLogic)).to.have.lengthOf(1)
  //   expect(wrapper.find(AboutPage)).to.have.lengthOf(0)
  //   expect(wrapper.find(PageNotFound)).to.have.lengthOf(0)
  //
  // })
  //
  // it("renders only the AboutPage component when the route is '/about'", function(){
  //
  //   let store = configureStore()
  //
  //   const wrapper = mount(
  //     <Provider store={store} >
  //       <MemoryRouter exact initialEntries={[ '/about' ]} >
  //         <Routes />
  //       </MemoryRouter>
  //     </ Provider>
  //   )
  //
  //   expect(wrapper.find(SearchLayoutAndLogic)).to.have.lengthOf(0)
  //   expect(wrapper.find(AboutPage)).to.have.lengthOf(1)
  //   expect(wrapper.find(PageNotFound)).to.have.lengthOf(0)
  //
  // })
  //
  // it("renders the PageNotFound component when the route is neither '/' nor '/about'", function(){
  //
  //   let store = configureStore()
  //
  //   const wrapper = mount(
  //     <Provider store={store} >
  //       <MemoryRouter exact initialEntries={[ '/about123' ]} >
  //         <Routes />
  //       </MemoryRouter>
  //     </ Provider>
  //   )
  //
  //   expect(wrapper.find(SearchLayoutAndLogic)).to.have.lengthOf(0)
  //   expect(wrapper.find(AboutPage)).to.have.lengthOf(0)
  //   expect(wrapper.find(PageNotFound)).to.have.lengthOf(1)
  //
  // })
})
