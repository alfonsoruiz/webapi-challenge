const express = require('express');
const router = express.Router();

const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');

// Projects
router.post('/', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  if (!name || !description) {
    res.status(400).json({
      error: 'Error posting to projects requires a name and description'
    });
  }

  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error posting project to DB' });
    });
});

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error getting project by ID' });
    });
});

router.put('/:id', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  if (!name || !description) {
    res.status(400).json({
      error: 'Error posting to projects requires a name and description'
    });
  }

  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error updating project' });
    });
});

router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error deleteting project' });
    });
});

//Actions
router.post('/:id/actions', (req, res) => {
  const project_id = req.body.project_id;
  const notes = req.body.notes;
  const description = req.body.description;

  if (!project_id) {
    res.status(404).json({ error: 'Error Project needs to have an ID' });
  }

  if (!description || !notes) {
    res.status(400).json({
      error: 'Error posting to actions require notes and description'
    });
  }

  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: 'Erro posting action to DB' });
    });
});

router.get('/:id/actions', (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(400).json({ error: 'Error getting action from DB' });
    });
});

router.get('/:id/actions/:id', (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(400).json({ error: 'Error getting action from DB' });
    });
});

router.put('/:id/actions/:id', (req, res) => {
  const project_id = req.body.project_id;
  const notes = req.body.notes;
  const description = req.body.description;

  if (!project_id) {
    res.status(404).json({ error: 'Error Project needs to have an ID' });
  }

  if (!description || !notes) {
    res.status(400).json({
      error: 'Error posting to actions require notes and description'
    });
  }

  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error updating action' });
    });
});

router.delete('/:id/actions/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: 'Error deleting action from DB'
      });
    });
});

module.exports = router;
