
exports.up = function (knex) {
  
  return (
    knex.schema.createTable("instructors", tbl => {
      tbl.increments();

      tbl
        .string("email")
        .notNullable()
        .unique();

      tbl.string("password")
        .notNullable()

      tbl.string('name') // What name can students search for
        .notNullable()
        .unique()

    }))
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('instructors');
};

