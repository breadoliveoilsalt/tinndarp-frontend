import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import CurrentItemContainer from './CurrentItemContainer'

describe("<CurrentItemContainer />", () => {

  it("renders nothing if there is no currentItem prop", () => {
    const wrapper = shallow(<CurrentItemContainer currentItem={null} />)

    expect(wrapper).toEqual({})
  })

  it("renders an image with the currentItem url_image if there is a currentItem prop", () => {
      const image_url_source = "some source"
      const wrapper = shallow(<CurrentItemContainer currentItem={{
        image_url: image_url_source
      }} />)

      expect(wrapper.find("img")).toHaveLength(1)
      expect(wrapper.find("img").prop("src")).toEqual(image_url_source)
    })

})
