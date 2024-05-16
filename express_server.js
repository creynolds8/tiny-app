// basic setup
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const { 
  generateRandomString,
  createUser,
  findUserByEmail,
 } = require('./functions/functions')

const app = express();
const PORT = 8080;

const urlDatabase = {
  b2xVn2: {
    longURL: 'http://www.lighthouselabs.ca',
    id: '4go2kL'
  },
  '9sm5xK': {
    longURL: 'http://www.google.com',
    id: '4go2kL'
  },
};

const userDatabase = {
  '4go2kL': {
    id: '4go2kL',
    email: 'user1@email.com',
    password: 'user1'
  },
  Kc9mq5: {
    id: 'Kc9mq5',
    email: 'user2@email.com',
    password: 'user2'
  },
};

let userCookie = null;

//configuration
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

// GET ROUTES

app.get('/login', (req, res) => {
  const templateVars = { user: null };
  if (userCookie) {
    return res.redirect('/urls');
  }
  return res.render('login', templateVars);
});

// show all urls page
app.get('/urls', (req, res) => {
  const templateVars = { 
    urls: urlDatabase,
    user: userDatabase[req.cookies['user_id']] || null,
  };
  return res.render('urls_index', templateVars);
});

// add GET route for register
app.get('/register', (req, res) => {
  const templateVars = { user: null };
  if (userCookie) {
    return res.redirect('/urls')
  };
  return res.render('register', templateVars);
});

// add a new url page
app.get('/urls/new', (req, res) => {
  if (!userCookie) {
    return res.redirect('/login')
  }
  const templateVars = {
    user: userDatabase[req.cookies['user_id']] || null,
  };
  return res.render('urls_new', templateVars);
});

// show individual url page
app.get('/urls/:id', (req, res) => {
  const templateVars = { 
    id: req.params.id, 
    longURL: urlDatabase[req.params.id].longURL,
    user: userDatabase[req.cookies['user_id']] || null,
  };
  return res.render('urls_show', templateVars);
});

// add redirect link for short url
app.get('/u/:id', (req, res) => {
  if (!urlDatabase[req.params.id]) {
    return res.send('Sorry that shortened URL does not exist')
  }
  const longURL = urlDatabase[req.params.id].longURL;
  return res.redirect(longURL);
});

// POST ROUTES

app.post('/urls', (req, res) => {
  if (!userCookie) {
    return res.send('Sorry, you are not logged in')
  }
  let key = generateRandomString()
  urlDatabase[key] = {
    id: key,
    longURL: req.body.longURL
  };
  return res.redirect(`/urls/${key}`);
});

// add POST for user login
app.post('/login', (req, res) => {
  const { error, user } = findUserByEmail(req.body, userDatabase)
  if (error) {
    console.log(error);
    return res.status(403).send(error);
    // return res.redirect('/login')
  }
  userCookie = res.cookie('user_id', user.id);
  return res.redirect('/urls');
})

// add POST route for register
app.post('/register', (req, res) => {
  const { error, user } = createUser(req.body, userDatabase);
  // check for from valid field check
  if (error) {
    console.log(error);
    return res.status(400).send(error);
    // return res.redirect('/register')
  }
  userCookie = res.cookie('user_id', user.id);
  return res.redirect('/urls');
});

// add route to POST url changes
app.post('/urls/:id', (req, res) => {
  if (req.body.longURL) {
  urlDatabase[req.params.id].email = req.body.longURL;
  };
  return res.redirect('/urls');
})

// add POST route to delete urls
app.post('/urls/:id/delete', (req, res) => {
  delete urlDatabase[req.params.id];
  return res.redirect('/urls');
});

// add POST and redirect for logout route
app.post('/logout', (req, res) => {
  userCookie = null;
  res.clearCookie('user_id')
  return res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = {
  urlDatabase,
  userDatabase,
};