const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const server = express();

const projectsDB = require('./data/helpers/projectsDB.js');
const actionsDB = require('./data/helpers/actionsDB.js');
const db = require('./dbConfig.js');
const PORT = 5000;

server.use(helmet());
server.use(express.json());

projectsDB.get()
  .then(projects => console.log(projects))
  .catch(err => console.log(err));

// GET ALL PROJECTS
server.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectsDB.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({message: 'Something went wrong'});
  }
});

// GET PROJECT BY ID
server.get('/api/projects/:id', (req, res) => {
  const {id} = req.params
  projectsDB.get(id)
  .then(project => {
    if (project) {
      db('actions as a')
        .where('a.project_id', id)
        .then(actions => {
          project.actions = actions
          res.status(200).json(project)
      })
    } else {
      res.status(404).json({message: 'project not found'})
    }
  })
  .catch(err => res.status(500).json(err));
});

// POST NEW PORJECT
server.post('/api/projects', async (req, res) => {
  try {
    const { name, description, complete, action } = req.body;

    const newProject = await projectsDB.create({ name, description, complete });
    res.status(200).json(newProject);
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET ACTIONS
server.get('/api/actions', async (req, res) => {
  try {
    const actions = await actionsDB.get();
    res.status(200).json(actions);
  } catch(err) {
    res.status(500).json(err);
  }
});

// POST NEW ACTION
server.post('/api/actions', async (req, res) => {
  try {
    const { description, notes, project_id } = req.body;
    const newAction = await actionsDB.create({ description, notes, project_id });

    res.status(200).json(newAction);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.listen(PORT, console.log(PORT));