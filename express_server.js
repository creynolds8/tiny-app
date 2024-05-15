// basic setup
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const app = express();
const PORT = 8080;

const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

// random ID creator
// original random generator solution was also viable
const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const generateRandomString = function(str) {
  let rndStr = ''
  while (rndStr.length < 6) {
    const i = Math.random() * str.length;
    rndStr += str[Math.floor(i)];
  }
  return rndStr;
};

//configuration
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

// routes
app.get('/', (req, res) => {
  res.send('Hello');
});

// show all urls page
app.get('/urls', (req, res) => {
  const templateVars = { 
    urls: urlDatabase,
    username: req.cookies['username'],
  };
  res.render('urls_index', templateVars);
});

app.post('/urls', (req, res) => {
  let key = generateRandomString(str)
  urlDatabase[key] = req.body.longURL;
  res.redirect(`/urls/${key}`);
});

// add POST for user login
app.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/urls');
})

// add a new url page
app.get('/urls/new', (req, res) => {
  const templateVars = {
    username: req.cookies['username'],
  };
  res.render('urls_new', templateVars);
});

// show individual url page
app.get('/urls/:id', (req, res) => {
  const templateVars = { 
    id: req.params.id, 
    longURL: urlDatabase[req.params.id],
    username: req.cookies['username']
  };
  res.render('urls_show', templateVars);
});

// add route to POST url changes
app.post('/urls/:id', (req, res) => {
  if (req.body.longURL) {
  urlDatabase[req.params.id] = req.body.longURL;
  };
  res.redirect('/urls');
})

// add POST route to delete urls
app.post('/urls/:id/delete', (req, res) => {
  console.log(urlDatabase[req.params.id]);
  delete urlDatabase[req.params.id];
  res.redirect('/urls');
});

// add redirect link for short url
app.get('/u/:id', (req, res) => {
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
})

// add POST and redirect for logout route
app.post('/logout', (req, res) => {
  res.clearCookie('username')
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});