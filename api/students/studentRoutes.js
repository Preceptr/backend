const { Router } = require('express')
const router = Router();
const Student = require('./studentModel');
const StudentServices = require('./studentServices')

const checkStudentCookie = async (req, res, next) => {
    console.log('res.cookies', req.cookies)
    
    try {
        const {student} = req.cookies
        if (student) {
            req.studentID = student
            next()
        } else {
            const studentID = await StudentServices.registerStudent()
            res.cookie('student', studentID , { maxAge: 604800000, httpOnly: true });
            req.studentID = studentID
            next()
        }


    } catch (error) {
        next(error)
    }
}
// 
router.get('/', checkStudentCookie, (req, res, next) => {
    try {

        res.json({studentID: req.studentID})

        // return user data
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
