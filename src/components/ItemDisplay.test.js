import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ItemDisplay from './ItemDisplay'
Enzyme.configure({
  adapter: new Adapter()
})

describe("<ItemDisplay />", () => {

  const itemName = "BUSKBO"
  const itemImageURL = "https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s"
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
    wrapper = mount( <ItemDisplay item={
        currentItem
      }
    />)
  })


  it("renders an image with the currentItem url_image and 'item-image' className", () => {
    expect(wrapper.find("img")).toHaveLength(1)
    expect(wrapper.find("img").prop("src")).toEqual(itemImageURL)
    expect(wrapper.find("img").prop("className")).toEqual("item-image")
  })

  it("renders the item's name in div with the classname 'item-info'", () => {
    expect(wrapper.find("div.item-info").text()).toContain(itemName)
  })

  it("renders the item's price in div with the classname 'item-info'", () => {
    expect(wrapper.find("div.item-info").text()).toContain("$" + itemPrice)
  })

  it("renders the item's description in div with the classname 'item-info'", () => {
    expect(wrapper.find("div.item-info").text()).toContain(itemDescription)
  })

  it("renders a 'More Info' link, linking to the currentItem's moreInfoURL", () => {
    const itemLink = wrapper.find("a")

    expect(itemLink.exists()).toBeTruthy()
    expect(itemLink.prop("href")).toEqual(itemMoreInfoURL)
  })

})
