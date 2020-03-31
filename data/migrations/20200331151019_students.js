exports.up = function (knex) {
  
  return (
    knex.schema.createTable("students", tbl => {
      tbl.increments();

      tbl
        .string("email")
        .nullable()
        .unique();

      tbl.string("password")
        .nullable()

      tbl.string('name')
        .nullable()

      tbl.boolean('registered')
        .notNullable()
        .defaultTo(false);
    }))
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students');
};
