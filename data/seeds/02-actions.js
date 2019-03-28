
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {project_id: 1, description: 'action1', notes: 'NOTES HERE'},
        {project_id: 1, description: 'action2', notes: 'NOTES HERE'},
        {project_id: 2, description: 'action1', notes: 'NOTES HERE'},
        {project_id: 2, description: 'action2', notes: 'NOTES HERE'},
        {project_id: 3, description: 'action1', notes: 'NOTES HERE'},
        {project_id: 3, description: 'action2', notes: 'NOTES HERE'}
      ]);
    });
};
