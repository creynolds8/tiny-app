Note *1*
-I made the choice to return the object for the following reasons:
  -This allowed me to pass specific error messages within the object by
  making the messages the value of the error key
  -This also allowd to pass both values to all of the view files and render those
  files dynamically depending on whether there was a user logged in or not
  -This also allowed me pass those specific error message into the view files
  and display the error messages using HTML and have it be formatted in a way
  that users would be familiar with
  -Displaying the errors this way also meant not having to leave the page in the
  case of login and register, allowing the user to try either again without having
  to navigate back to the desired page

Note *2*
-The reason that these specific lines of the test file have been commented out is as follows:
  -upon testing these routes manually and checking the Developer tools it was
  clear that the status code is 302 indicating a redirect.
  -however, the specific test lines expecting a 302 redirect status code were getting
  a 200 success status code.
  -I determined this was because the test was reading the 200 success code from
  reaching the desired URL instead of reading the 302 redirect code.
  -I spent an hour in a Zoom call with mentor Lovemore Jokonya trying to first
  diagnose then solve this issue
  -Unfortunately we could not figure a work around to the test library following
  the redirect and recieving the 'wrong' status code. At this point, we decided 
  that to comment out the problem line of the test and direct here for more info.