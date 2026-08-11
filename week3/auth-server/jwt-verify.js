const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFiZHVsbWFqaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODY0NDc2ODAsImV4cCI6MTc4NjQ1MTI4MH0._En40GMxTCxjsOO4UTmOVssqrBjYI_6l1RXSxqtmZ30'


const secret = 'mysecretkey';

try {
  const decoded = jwt.verify(token, secret);

  console.log('Token is valid');

  console.log(decoded);
} catch (err) {
  console.log('Invalid token');

  console.log(err.message);
}