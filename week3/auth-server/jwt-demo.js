const jwt = require('jsonwebtoken');

const secret = 'mysecretkey';

const token = jwt.sign(
  {
    id: 1,
    name: 'Abdulmajid',
    role: 'admin',
  },
  secret,
  {
    expiresIn: '1h',
  }
);

console.log('Generated JWT:');
console.log(token);