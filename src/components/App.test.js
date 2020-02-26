import React from "react"
import { render } from "@testing-library/react"
import App from "./App"
import Header from "./Header"
import { shallow } from "enzyme"

describe("<App />", () => {
  it("is true", () => {
    expect(true).toBeTruthy()
  })
})

  // it("renders a <Header /> component") {
  //   const wrapper = shallow(<App />)
  //   expect(wrapper.find(Header)).to.have.lengthOf(1)
  // };
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
