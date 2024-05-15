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
  const userId = generateRandomString();
  userDatabase[userId] = {
    id: userId,
    email: userInfo.email,
    password: userInfo.password
  };
  return userDatabase[userId];
}

module.exports = {
  generateRandomString,
  createUser,
};