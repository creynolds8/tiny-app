// basic setup
const express = require('express');
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

// middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

// routes
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

// show all urls page
app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.post('/urls', (req, res) => {
  let key = generateRandomString(str)
  urlDatabase[key] = req.body.longURL;
  console.log(urlDatabase);
  res.redirect(`/urls/${key}`)
    const templateVars = { id: key, longURL: urlDatabase[req.params.id] };
    res.render('urls_show', templateVars);
});

// show current url list with json
app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

// add a new url page
app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

// show individual url page
app.get('/urls/:id', (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render('urls_show', templateVars);
});

// add redirect link for short url
app.get('/u/:id', (req, res) => {
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});