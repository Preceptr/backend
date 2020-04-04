const InstructorModel = require('./instructorModel')

const register = async instructor => {
  const newInstructorID = await InstructorModel.add(instructor)
  const [newInstructor] = await InstructorModel.find(newInstructorID)
  console.log(
    'services.RegisterInstructor', newInstructor
  )
  return newInstructor
}

// const loginInstructor = async (email, password)

const getAllInstructors = async () => {
  return await InstructorModel.getAll()
}

const findByEmail = async email => {
  const [newInstructor] = await InstructorModel.findBy({ email })
  return newInstructor || null
}

const changeName = async name => {
  return await InstructorModel.changeName(name)
}

const checkNameExists = async name => {
  const [nameExists] = await InstructorModel.findBy({ name })
  if (nameExists) {
    return true
  }
  return false
}

const checkEmailExists = async  email => {
  const [emailExists] = await InstructorModel.findBy({ email })
  if (emailExists) {
    return true
  }
  return false
}


module.exports = {changeName, checkNameExists, checkEmailExists, findByEmail, register, getAllInstructors }