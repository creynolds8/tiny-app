# Welcome to my Tiny App Project!

## Final Product

!['Screenshot of URLs Page'](https://github.com/creynolds8/tiny-app/blob/main/docs/url-show.png?raw=true)

!['Screenshot of individual URL Page'](https://github.com/creynolds8/tiny-app/blob/main/docs/urls-page.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcryptjs
- cookie-session

## Getting Started

- Install the above dependencies (using `npm install {dependency name}` command).
- Run the web server using `node express_server.js` command

### Created by Cameron Reynolds during Web Development Bootcamp at Lighthouse Labs

### Please reach out on Discord if you have any questions, concerns, or issues!
### Discord Username: @fuzzyslippers256

### Below is a note to explain some choices I made in this project 

### Note *1*
-I made the choice to return the object for the following reasons:
  1. This allowed me to pass specific error messages within the object by
  making the messages the value of the error key

  2. This also allowd to pass both values to all of the view files and render those
  files dynamically depending on whether there was a user logged in or not.

  3. This also allowed me pass those specific error message into the view files
  and display the error messages using HTML and have it be formatted in a way
  that users would be familiar with.

  4. Displaying the errors this way also meant not having to leave the page in the
  case of login and register, allowing the user to try either again without having
  to navigate back to the desired page.



  ![alt text](https://www.lighthouselabs.ca/assets/larry-309b0188c5377c5a70c86df7c844be1b57e17468ac674e764fafb0d689ce9fa7.png)