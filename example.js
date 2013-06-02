var narc = require('./narc')

// Specify the configuration file,
// target page,
// and test function.

narc('./twilio.json', 'https://news.ycombinator.com', function ($) {

  // This example checks for polls on the front page of Hacker News.

  var poll_count = 0
  $('.title a').each(function (i, el) {
    if (/Poll: .*/.test($(el).text())) poll_count++
  })

  // If the notification shouldn't be sent, return false.
  // Otherwise, return the content of the notification.

  if (poll_count == 0) {
    return false
  } else {
    return "There are " + poll_count + " new Hacker News polls"
  }
})

