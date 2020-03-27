const express = require('express');
const router = express.Router();
const AuthRouter = require('./routes/auth/auth-route');
const restricted = require('./routes/auth/restricted-middleware');
const UserRouter = require('./routes/users/user-route');
const HelperRouter = require('./helpers/helperRoutes')

router.get('/', (req, res) => {
  res.status(200).json({ welcome: 'API router' });
});

router.use('/auth', AuthRouter);
router.use('/helpers', HelperRouter)
router.use('/users', restricted, UserRouter);

module.exports = router;

// If a role is needed later ----

// function checkRole(...roles) {
//   return (req, res, next) => {
//     console.log(req.decodedToken);
//     if (
//       req.decodedToken &&
//       req.decodedToken.department &&
//       roles.includes(req.decodedToken.department.toLowerCase())
//     ) {
//       next();
//     } else {
//       res.status(403).json({ message: `Don't have access!` });
//     }
//   };
// }
