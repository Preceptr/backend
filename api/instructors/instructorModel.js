const db = require('../../data/db.config');

const pong = () => "pong"

const find = async (id) => {
    return await db('instructors').where({ id });
}

const add = async (instructor) => {
    const [newInstructorID] = await db('instructors').insert(instructor).returning('id')
    return newInstructorID;
}

const getAll = () => db('instructors')

function findBy(filter) {
    return db('instructors').where(filter);
}

const changeName = async (name) => {
    const [newInstructorName] = await db('instructors').update({ name }).returning('name')
    return newInstructorName
}

module.exports = { changeName, find, add, findBy, pong, getAll };