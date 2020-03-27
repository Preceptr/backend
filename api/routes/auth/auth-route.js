const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');
const router = express.Router();
const Users = require('../users/user-Modal');

router.post('/register', (req, res) => {
  let user = req.body;
  console.log(user, 'user');
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      console.log(saved, 'SAVED');
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.post('/login', (req, res) => {
  let { username, password, department } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: 'Login successful',
          token
        });
      } else {
        res.status(500).json({ error: 'login error' });
      }
    })
    .catch(err => res.status(500).json(err.message));
});

router.get('/logout', function(req, res) {
  res.status(200).json({ Hello: 'HELLO' });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
