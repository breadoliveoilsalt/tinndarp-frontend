import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ComparingDisplay from './ComparingDisplay'
import ErrorsDisplay from '../../components/ErrorsDisplay'
import CompareForm from './CompareForm'
import ItemDisplay from 'components/ItemDisplay'
Enzyme.configure({ adapter: new Adapter() })

describe("<ComparingDisplay/>", () => {

  it("renders an <ErrorDisplay/> if there are errors", () => {

    const props = {
      errors: "Something went wrong"
    }

    const wrapper = shallow(<ComparingDisplay {...props} />)

    expect(wrapper.find(ErrorsDisplay).length).toEqual(1)
  })

  it("passes its errors prop to <ErrorDisplay/> if there are errors", () => {

    const props = {
      errors: "Something went wrong"
    }

    const wrapper = shallow(<ComparingDisplay {...props} />)

    expect(wrapper.find(ErrorsDisplay).prop("errors")).toEqual(props.errors)
  })

  it("does not render an <ErrorDisplay/> if there are no errors", () => {

    const props = {
      errors: null 
    }

    const wrapper = shallow(<ComparingDisplay {...props} />)

    expect(wrapper.find(ErrorsDisplay).length).toEqual(0)
  })

  it("renders a <CompareForm/>", () => {
    const wrapper = shallow(<ComparingDisplay />)

    expect(wrapper.find(CompareForm).length).toEqual(1)
  })

  it("passes its handleComparison to <CompareForm/> as an action prop", () => {
    const wrapper = shallow(<ComparingDisplay />)

    expect(wrapper.find(CompareForm).prop("action")).toEqual(wrapper.prop("handleComparion"))
  })

  it("renders a ItemDisplay for each commonItem", () => {
    const props = {
      commonItems: [{id: "0", name: "item1"}, {id: "1", name: "item2"}, {id: "2", name: "item3"}]
    }

    const wrapper = shallow(<ComparingDisplay {...props} />)

    const itemDisplays = wrapper.find(ItemDisplay)

    expect(itemDisplays.length).toEqual(3)
  })

  it("passes a commonItem object to each ItemDisplay", () => {
    const props = {
      commonItems: [{id: "0", name: "item1"}, {id: "1", name: "item2"}]
    }

    const wrapper = shallow(<ComparingDisplay {...props} />)

    const itemDisplays = wrapper.find(ItemDisplay)

    expect(itemDisplays.length).toEqual(2)
    expect(itemDisplays.at(0).prop("item")).toEqual(props.commonItems[0])
    expect(itemDisplays.at(1).prop("item")).toEqual(props.commonItems[1])
  })

})
