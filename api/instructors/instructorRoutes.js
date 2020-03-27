const router = express.Router();
const Instructor = require('./instructorModel');

router.get('/', (req, res) => {
  Instructor.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err.message));
});

module.exports = router;
