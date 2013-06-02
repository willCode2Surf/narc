var jsdom = require('jsdom').jsdom
  , jquery = require('jquery')
  , request = require('request')

var narc = module.exports = function (config, url, test) {

  // Grab the page

  request(url, function (error, response, body) {

    // Handle errors from the request

    if (error) {
      throw error
    } else if (response.statusCode !== 200) {
      throw new Error('Status not 200')
    }
    
    // Create a representation of the page
    // for the instance of jQuery.

    var window = jsdom(body).createWindow()
      , $ = jquery.create(window)

    // Call the test function,
    // assigning `this` to the `response` argument.

    var notification = test.call(response, $)

    // Send notification if there is one.

    if (notification !== false) {
      console.log(notification)
    }
  })
}

