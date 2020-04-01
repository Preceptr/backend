const db = require('../../data/db.config');

const pong = () => "pong"

// function find(id) {
//     let user = db('students');

//     if (id) {
//         return user.where({ id: id }).first();
//     } else {
//         return user;
//     }
// }

/**
 * Adds new user with null values, and returns the id directly
 */
const add = async() => { 
    const [newStudentID] = await db('students').insert({}).returning('id') 
    return newStudentID
};

const getAll = () => db('students')

const changeName = async (name) => {
    const [newStudentName] = await db('students').update({name}).returning('name')
    return newStudentName
}

// function findBy(filter) {
//     return db('users').where(filter);
// }

module.exports = { pong, add, getAll, changeName }