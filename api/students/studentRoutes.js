const { Router } = require('express')
const router = Router();
const Student = require('./studentModel');

router.post('/ping', (req, res, next) => {
    try {
        console.log('instructorPing', req.body)

        if (req.body.ping !== "ping") {
            const notPing = new Error("Not 'ping' in  Student route")
            notPing.httpStatusCode = 400
            throw notPing
        }

        res.json(Student.pong())

    } catch (e) {
        next(e)
    }
})

module.exports = router;
