var jsdom = require('jsdom').jsdom
  , jquery = require('jquery')
  , request = require('request')
  ;

request('https://tito.io/nodeconf/nodeconf-2013', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var window = jsdom(body).createWindow()
      , $ = jquery.create(window)
    console.log($('.ticket-status-sold-out').text());
  }
})
