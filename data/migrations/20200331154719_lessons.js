
exports.up = function (knex) {
  
  return (
    knex.schema.createTable("lessons", tbl => {
      tbl.increments();

      tbl
        .json("board_working")
        .nullable()

      tbl
        .json("board") // the actual board that students see and instructor creates
        .nullable()

      tbl.integer("instructor_id")
        .notNullable()

      tbl.string('name') 
        .notNullable()
        .unique()
    }))
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('lessons');
};

