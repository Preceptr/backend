const Helper = require('./helperModel');
const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    Instructor.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json(err.message));
});

router.post('/ping', async (req, res, next) => {
    try {
        console.log('helperPing', req.body)
        if(req.body.ping !== "ping"){
            const notPing = new Error("Not 'ping' in helper route")
            notPing.httpStatusCode= 400
            throw notPing
        }

        res.json(Helper.pong())
    } catch (e) {
        next(e)
    }
})

module.exports = router;
