const assert = require('chai').assert;
const { findUserByEmail } = require('../helpers');

const testUsers = {
  user1: {
    id: 'user1id',
    email: 'user1@email.com',
    password: '$2a$10$bm8KiHoYH4MBg5H//hjYbO2NLopGgB5GAmKQNodd6HB1tLqazOKNi'
  },
  user2: {
    id: 'user2id',
    email: 'user2@email.com',
    password: 'user2'
  }
};

describe('findUserByEmail', function() {
  it('should return a user with a valid email', function() {
    const loginInfo = {
      password: 'user1',
      email: 'user1@email.com'
    }
    const result = findUserByEmail(loginInfo, testUsers)
    const expectedUserId = 'user1id';
    assert.isNull(result.error);
    assert.equal(result.user.id, expectedUserId);
  });
  it('should return User not found if user does not exist', () => {
    const loginInfo = {
      email: 'user3@email.com',
      password: 'user3'
    }
    const result = findUserByEmail(loginInfo, testUsers)
    assert.isNull(result.user);
    assert.equal(result.error, 'User not found');
  });
  it('return incorrect password if the password is wrong', () => {
    const loginInfo = {
      password: 'wrong',
      email: 'user1@email.com'
    }
    const result = findUserByEmail(loginInfo, testUsers)
    assert.isNull(result.user)
    assert.equal(result.error, 'Incorrect Password')
  });

});