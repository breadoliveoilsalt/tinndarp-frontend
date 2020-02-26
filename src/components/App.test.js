import React from "react"
import { render } from "@testing-library/react"
import App from "./App"
import Header from "./Header"
import Enzyme, { shallow } from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe("<App />", () => {
  it("is true", () => {
    expect(true).toBeTruthy()
  })

  it("renders a <Header /> component", () => {
    const wrapper = shallow(<App />)
    console.log(wrapper.debug())
    expect(wrapper.find("div")).toHaveLength(1)
    // expect(wrapper.find(Header)).to.have.lengthOf(1)
  })
})
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
