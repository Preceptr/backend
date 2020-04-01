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

const changeStudentName = async name => {
  return await StudentModel.changeName(name)
} 

module.exports = { registerStudent, getAllStudents, changeStudentName }