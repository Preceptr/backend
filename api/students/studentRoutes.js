const { Router } = require('express')
const router = Router();
const Student = require('./studentModel');
const StudentServices = require('./studentServices')

const checkStudentCookieAndRegister = async (req, res, next) => {
    console.log('res.cookies', req.cookies)

    try {
        const { student } = req.cookies
        if (student) {
            req.studentID = student
            next()
        } else {
            const studentID = await StudentServices.registerStudent()
            res.cookie('student', studentID, { maxAge: 604800000, httpOnly: true });
            req.studentID = studentID
            next()
        }


    } catch (error) {
        next(error)
    }
}

const authorizeStudent = (req, res, next) => {
    console.log('authorizedStudent')
    try {
        const { student } = req.cookies
        if (!student) {
            const unauthorized = new Error('Not authorized')
            unauthorized.httpStatusCode = 403
            throw unauthorized
        }
        next()
    } catch (error) {
        next(error)
    }
}

// Checks for cookie, if cookie then studnet id on cookie is placed on req.studentID,
// else new unregistered student is created, cookie set, new id is placed on req.studentID
router.get('/', checkStudentCookieAndRegister, (req, res, next) => {
    try {
        res.json({ studentID: req.studentID })
    } catch (error) {
        next(error)
    }
})

// Changes a students name based on student info in cookie 
router.put('/name', authorizeStudent, async (req, res, next) => {
    try {
        const newStudentName = await StudentServices.changeStudentName(req.body.name)
        res.json({ name: newStudentName })
    } catch (error) {
        next(error)
    }
})

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
