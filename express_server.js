// basic setup
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");

const {
  generateRandomString,
  createUser,
  findUserByEmail,
  urlsForUser,
} = require("./helpers");

const app = express();
const PORT = 8080;

const urlDatabase = {
  b2xVn2: {
    longURL: "http://www.lighthouselabs.ca",
    id: "4go2kL",
  },
  "9sm5xK": {
    longURL: "http://www.google.com",
    id: "4go2kL",
  },
};

const userDatabase = {
  "4go2kL": {
    id: "4go2kL",
    email: "user1@email.com",
    password: "$2a$10$3jKIujazmVdf7826GQv5fO62qFLqlDD6szHnCUXk/2Nerkbwz2ctK",
  },
  Kc9mq5: {
    id: "Kc9mq5",
    email: "user2@email.com",
    password: "$2a$10$1pElZOjD80zauoGPmp488uJt2vl50eDKHbMzfZy3BIbkW9QKxEonq",
  },
};

//configuration
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "user_id",
    keys: ["248163264"],
  })
);

// GET ROUTES

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  const templateVars = { error: null, user: null };
  if (req.session.user_id) {
    return res.redirect("/urls");
  }
  return res.render("login", templateVars);
});

// show all urls page
app.get("/urls", (req, res) => {
  if (!req.session.user_id) {
    const templateVars = {
      error: "Please login or register to view URLs",
      user: null,
    };
    res.status(401);
    return res.render("urls_index", templateVars);
  }
  if (req.session.user_id) {
    const templateVars = {
      error: null,
      urls: urlsForUser(req.session.user_id, urlDatabase),
      user: userDatabase[req.session.user_id] || null,
    };
    return res.render("urls_index", templateVars);
  }
  return res.render("urls_index");
});

// add GET route for register
app.get("/register", (req, res) => {
  const templateVars = { error: null, user: null };
  if (req.session.user_id) {
    return res.redirect("/urls");
  }
  return res.render("register", templateVars);
});

// add a new url page
app.get("/urls/new", (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  const templateVars = {
    user: userDatabase[req.session.user_id] || null,
  };
  return res.render("urls_new", templateVars);
});

// show individual url page
app.get("/urls/:id", (req, res) => {
  if (!req.session.user_id) {
    const templateVars = {
      error: "Please login to view this URL",
      user: null,
    };
    res.status(401);
    return res.render("urls_show", templateVars);
  }
  if (!urlDatabase[req.params.id]) {
    const templateVars = {
      error: "This URL does not exist",
      user: null,
    };
    res.status(404);
    return res.render("urls_show", templateVars);
  }
  if (req.session.user_id !== urlDatabase[req.params.id].id) {
    const templateVars = {
      error: "You do not have access to this URL",
      user: null,
    };
    res.status(403);
    return res.render("urls_show", templateVars);
  }
  const templateVars = {
    error: null,
    id: req.params.id,
    longURL: urlDatabase[req.params.id].longURL,
    user: userDatabase[req.session.user_id] || null,
  };
  return res.render("urls_show", templateVars);
});

// add redirect link for short url
app.get("/u/:id", (req, res) => {
  if (!urlDatabase[req.params.id]) {
    const templateVars = {
      error: "Sorry that shortened URL does not exist",
      user: null,
    };
    res.status(404);
    return res.render("urls_show", templateVars);
  }
  const longURL = urlDatabase[req.params.id].longURL;
  return res.redirect(longURL);
});

// POST ROUTES

app.post("/urls", (req, res) => {
  if (!req.session.user_id) {
    res.status(401);
    return res.send("Sorry, you are not logged in");
  }
  let key = generateRandomString();
  urlDatabase[key] = {
    id: req.session.user_id,
    longURL: req.body.longURL,
  };
  return res.redirect(`/urls/${key}`);
});

// add POST for user login
app.post("/login", (req, res) => {
  const { error, user } = findUserByEmail(req.body, userDatabase);
  if (error) {
    const templateVars = { error: error, user: null };
    res.status(401);
    return res.render("login", templateVars);
  }
  req.session.user_id = user.id;
  return res.redirect("/urls");
});

// add POST route for register
app.post("/register", (req, res) => {
  const { error, user } = createUser(req.body, userDatabase);
  // check for from valid field check
  if (error) {
    const templateVars = { error: error, user: null };
    res.status(400);
    return res.render("register", templateVars);
  }
  req.session.user_id = user.id;
  return res.redirect("/urls");
});

// add route to POST url changes
app.post("/urls/:id", (req, res) => {
  if (req.session.user_id !== urlDatabase[req.params.id].id) {
    const templateVars = {
      error: "You do not have access to this URL",
      user: null,
    };
    res.status(403);
    return res.render("urls_show", templateVars);
  }
  if (req.body.longURL) {
    urlDatabase[req.params.id].longURL = req.body.longURL;
  }
  return res.redirect("/urls");
});

// add POST route to delete urls
app.post("/urls/:id/delete", (req, res) => {
  if (req.session.user_id !== urlDatabase[req.params.id].id) {
    const templateVars = {
      error: "You do not have access to this URL",
      user: null,
    };
    res.status(403);
    return res.render("urls_show", templateVars);
  }
  delete urlDatabase[req.params.id];
  return res.redirect("/urls");
});

// add POST and redirect for logout route
app.post("/logout", (req, res) => {
  req.session = null;
  return res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});