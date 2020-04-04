const express = require('express');
const router = express.Router();
const HelperRouter = require('./helpers/helperRoutes')
const InstructorRouter = require('./instructors/instructorRoutes')
const StudentRouter = require('./students/studentRoutes')
router.get('/', (req, res) => {
  res.status(200).json({ welcome: 'API router' });
});

router.use('/helpers', HelperRouter)
router.use('/instructors', InstructorRouter)
router.use('/students', StudentRouter)

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
