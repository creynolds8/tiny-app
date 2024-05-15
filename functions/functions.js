// random ID creator
// original random generator solution was also viable
const generateRandomString = function() {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let rndStr = ''
  while (rndStr.length < 6) {
    const i = Math.random() * str.length;
    rndStr += str[Math.floor(i)];
  }
  return rndStr;
};

const createUser = function(userInfo, userDatabase) {
  // check if in put fields are valid
  const keyArr = Object.keys(userInfo);
  for (const key of keyArr) {  
  if (!userInfo[key]) {
      return { error: 'Blank field', user: null };
    }
  };
  for (const user in userDatabase) {
    if (userInfo.email === userDatabase[user].email) {
      return { error: 'That email is already registered', user: null };
    }
  }
  const userId = generateRandomString();
  userDatabase[userId] = {
    id: userId,
    email: userInfo.email,
    password: userInfo.password
  };
  return { error: null, user: userDatabase[userId] };
};

const findUser = function(userId, userDatabase) {
  for (const user in userDatabase) {
    if (user === userId) {
      return { error: null, user: user};
    }
  }
  return { error: 'User doesnt exist', user: null };
};

module.exports = {
  generateRandomString,
  createUser,
  findUser,
};