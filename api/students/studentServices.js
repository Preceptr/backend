const StudentModel = require('./studentModel')

const registerStudent = async () => {
  const newStudent = await StudentModel.add()
  console.log(
    'services.RegisterStudent', newStudent
  )
  return newStudent
}

const getAllStudents = async () => {
  return await StudentModel.getAll()
}

module.exports = { registerStudent, getAllStudents }