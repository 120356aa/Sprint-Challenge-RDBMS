
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'proj1', description: 'Some description'},
        {name: 'proj2', description: 'Another description'},
        {name: 'proj3', description: 'A third description'}
      ]);
    });
};
