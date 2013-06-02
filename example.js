var narc = require('./narc')

// Specify the configuration file,
// target page,
// and test function.

narc('./twilio.json', 'https://news.ycombinator.com', function ($) {

  // This example checks for polls on the front page of Hacker News.

  function isPoll ($link) {
    return /Poll: .*/.test( $link.text() )
  }

  var polls = [], $link
  $('.title a').each(function (i, el) {
    $link = $(el)
    if (isPoll($link)) {
      polls.push($link)
    }
  })

  // If the notification shouldn't be sent, return false.
  // Otherwise, return the content of the notification.

  if (polls.length === 0) {
    return false
  } else {
    return (
      "There are " + polls.length + " new Hacker News polls"
    )
  }
})

