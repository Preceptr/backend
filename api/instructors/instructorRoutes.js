const { Router } = require('express')
const router = Router();
const Instructor = require('./instructorModel');

router.post('/ping', (req, res, next) => {
    try {
        console.log('instructorPing', req.body)

        if (req.body.ping !== "ping") {
            const notPing = new Error("Not 'ping' in instructor route")
            notPing.httpStatusCode = 400
            throw notPing
        }

        res.json(Instructor.pong())

    } catch (e) {
        next(e)
    }
})

module.exports = router;
