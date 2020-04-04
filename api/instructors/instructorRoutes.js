const { Router } = require('express')
const router = Router();
const Instructor = require('./instructorModel');
const InstructorServices = require('./instructorServices')
const { comparePasswords, hashPassword } = require('../utils')

const checkBody = type => (req, res, next) => {
    try {
        if (type === 'register') {
            const { email, name, password } = req.body
            if (!email || !name || !password) {
                const incomplete = new Error('Please submit all data')
                incomplete.httpStatusCode = 400
                throw incomplete
            }
        }

        if (type === 'login') {
            const { email, password } = req.body
            if (!email || !password) {
                const incomplete = new Error('Please submit all data')
                incomplete.httpStatusCode = 400
                throw incomplete
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}

const checkUnique = async (req, res, next) => {
    try {
        const nameExists = await InstructorServices.checkNameExists(req.body.name)
        if (nameExists) {
            const existsError = new Error(`${req.body.name} has been taken`)
            existsError.httpStatusCode = 400
            throw existsError
        }

        const emailExists = await InstructorServices.checkEmailExists(req.body.email)
        if (emailExists) {
            const existsError = new Error(`${req.body.email} has been taken`)
            existsError.httpStatusCode = 400
            throw existsError
        }


        next()

    } catch (error) {
        next(error)
    }
}



router.post('/register', checkBody('register'), checkUnique, async (req, res, next) => {
    try {
        const { email, name, password } = req.body

        const hashedPassword = hashPassword(password)
        const newInstructor = await InstructorServices.register({ email, name, password: hashedPassword })
    
        res.cookie('instructor', newInstructor.id, { maxAge: 604800000, httpOnly: true });
        res.json({ id: newInstructor.id, name: newInstructor.name, authorized: true })

    } catch (error) {
        if (error.code === '23505') {
            const unique = new Error(error.detail)
            unique.httpStatusCode = 400
            next(unique)
            return
        }
        next(error)
    }
})

router.post('/login', checkBody('login'), async (req, res, next) => {
    try {
        const { password, email } = req.body

        const foundInstructor = await InstructorServices.findByEmail(email)
        if (!foundInstructor) {
            const incorrect = new Error('Password or email incorect')
            incorrect.httpStatusCode = 400
            throw incorrect
        }
        const authorized = comparePasswords(password, foundInstructor.password)

        if (!authorized) {
            const incorrect = new Error('Password or email incrrect')
            incorrect.httpStatusCode = 400
            incorrect.details = { authorized: false }
            throw incorrect
        }
        res.cookie('instructor', newInstructor.id, { maxAge: 604800000, httpOnly: true });
        res.json({ authorized: true, id: foundInstructor.id, name: foundInstructor.name })

    } catch (error) {
        next(error)
    }
})

// router.put('/name', )

router.post('/ping', (req, res, next) => {
    try {
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
