import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import Home from './Home'

describe("<Home />", () => {

  describe("if the user not is logged in", () => {

    it("renders a button for signing up and a button for logging in", () => {

    })

    describe("Clicking the button for signing up", () => {

      it("redirect the user to the /sign_up page", () => {

      })

    })

    describe("Clicking the button for logging in", () => {

      it("redirects the user to the /log_in page", () => {

      })

    })
  })

  describe("if the user is logged in", () => {

    it("renders a button for browsing", () => {

    })

    describe("Clicking the button for browsing", () => {

      it("redirects the user to the /browsing page", () => {

      })
    })

  })


})
