var jsdom = require('jsdom').jsdom
  , jquery = require('jquery')
  , request = require('request')

var routes = {
  "https://news.ycombinator.com": function ($) {
    console.log($('.title a').text())
  }
}

var scrape_single = function (url, cb) {
  request(url, function (error, response, body) {
    if (error) {
      throw error
    } else if (response.statusCode !== 200) {
      throw new Error('status not 200')
    }
    
    var window = jsdom(body).createWindow()
      , $ = jquery.create(window)

    cb.call(response, $)
  })
}

var scrape = function () {
  for (var url in routes) {
    if (routes.hasOwnProperty(url)) {
      scrape_single(url, routes[url])
    }
  }
}

scrape()

