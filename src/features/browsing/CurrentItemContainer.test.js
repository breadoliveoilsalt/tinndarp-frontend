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

  describe("if there is a currentItem prop", () => {

    const itemName = "BUSKBO"
    const itemImageURL =  "https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s"
    const itemPrice = "130.00"
    const itemDescription = "Armchair, rattan"
    const itemMoreInfoURL = "https://www.ikea.com/us/en/p/buskbo-armchair-rattan-70434311/"

    const currentItem = {
      name: itemName,
      imageURL: itemImageURL,
      price: itemPrice,
      description: itemDescription,
      moreInfoURL: itemMoreInfoURL
    }

    let wrapper
    beforeEach(() => {
      wrapper = shallow(<CurrentItemContainer currentItem={currentItem} />)
    })

    it("renders instructions on how to rate an item in a div with 'browsing-instruction' className", () => {
      const instructions = wrapper.find("div.browsing-instructions")

      expect(instructions).toHaveLength(1)

      const expectedMessage = "Click \"Like\" or \"Nope\" Below to Rate the Item"
      expect(instructions.text()).toEqual(expectedMessage)
      expect(instructions.props().className).toEqual("browsing-instructions")
    })

    it("renders an image with the currentItem url_image and 'browsing-item-image' className", () => {
      expect(wrapper.find("img")).toHaveLength(1)
      expect(wrapper.find("img").prop("src")).toEqual(itemImageURL)
      expect(wrapper.find("img").prop("className")).toEqual("browsing-item-image")
    })

    it("renders the item's name in div with the classname 'browsing-item-details'", () => {
      expect(wrapper.find("div.browsing-item-details").text()).toContain(itemName)
    })

    it("renders the item's price in div with the classname 'browsing-item-details'", () => {
      expect(wrapper.find("div.browsing-item-details").text()).toContain("$" + itemPrice)
    })

    it("renders the item's description in div with the classname 'browsing-item-details'", () => {
      expect(wrapper.find("div.browsing-item-details").text()).toContain(itemDescription)
    })

    it("renders a 'More Info' link, linking to the currentItem's moreInfoURL", () => {
      const itemLink = wrapper.find("a")

      expect(itemLink.exists()).toBeTruthy()
      expect(itemLink.prop("href")).toEqual(itemMoreInfoURL)
    })

  })

})
