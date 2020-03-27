const db = require('../../data/db.config');

const pong = () => "pong"

function find(id) {
  let user = db('helpers');

  if (id) {
    return user.where({ id: id }).first();
  } else {
    return user;
  }
}

async function add(user) {
  await db('helpers').insert(user);

  return find(user.id);
}

function findBy(filter) {
  return db('helpers').where(filter);
}


module.exports = { find, add, findBy, pong };
