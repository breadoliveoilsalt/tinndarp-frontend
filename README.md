[![Build Status](https://travis-ci.com/breadoliveoilsalt/tinndarp-frontend.svg?branch=master)](https://travis-ci.com/breadoliveoilsalt/tinndarp-frontend)

# TINNDARP Frontend

Link to app on AWS: http://3.14.8.206:5000/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run the app in development mode:

1. Fork it in GitHub and clone the master branch to your computer.

2. In your terminal, `cd` into the root directory of the app.

3. Run `npm install` to download dependencies.

4. Run `yarn start`.  

## To run unit tests:

After step 3 above:

* To run tests without interactive mode, from the app's root directory, run `yarn test:plain`.

* To run tests in interactive mode, from the app's root directory, run `yarn test`.

* To run tests with a debugger, insert `debugger;` (with a semi-colon!) in the script and run `yarn test:debug`.  Then turn to a browser's debugging tool.  For example, next open up Chrome and go to the ULR `chrome://inspect`.  Click on the running process to start a debugging window.

# To build the app:

From the root directory, run `yarn build`.  `cd` into the `build` directory.  From there, you can use a file serving tool like `python -m SimpleHTTPServer`. In a browser, navigate to the address and port specified by the file serving tool.
