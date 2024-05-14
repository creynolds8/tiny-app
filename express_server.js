const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  '9sm5xK': "http://www.google.com",
};

const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const generateRandomString = function(str) {
  let rndStr = ''
  while (rndStr.length < 6) {
    const i = Math.random() * str.length;
    rndStr += str[Math.floor(i)];
  }
  return rndStr;
};

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.post('/urls', (req, res) => {
  let key = generateRandomString(str)
  urlDatabase[key] = req.body.longURL;
  console.log(urlDatabase);
  res.redirect(`/urls/${key}`)
    const templateVars = { id: key, longURL: urlDatabase[req.params.id] };
    res.render('urls_show', templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls/:id', (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render('urls_show', templateVars);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});