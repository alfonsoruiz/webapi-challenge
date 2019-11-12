const express = require('express');
const router = express.Router();

const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');

// ***************** Projects *****************
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

// ***************** Actions *****************

router.post('/:id/actions', async (req, res) => {
  const { notes, description, project_id } = req.body;
  const newAction = { ...req.body, project_id: req.params.id };

  try {
    if (!project_id) {
      res.status(404).json({ error: 'Error Project needs to ahave an ID' });
    }

    if (!description || !notes) {
      res.status(400).json({
        error: 'Error posting to actions. Requires notes and description'
      });
    }

    const action = await Actions.insert(newAction);
    res.status(201).json(action);
  } catch (err) {
    res.status(500).json({ error: 'Error postin action to DB' });
  }
});

router.get('/:id/actions', async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);

    if (actions.length > 0) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: 'No actions for this project' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting actions for this project' });
  }
});

router.get('/:id/actions/:id', async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'No action with this ID' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting action with from DB' });
  }
});

router.put('/:id/actions/:id', async (req, res) => {
  const { project_id, notes, description } = req.body;
  try {
    if (!project_id) {
      res.status(404).json({ error: 'Error Project needs to have an ID' });
    }

    if (!description || !notes) {
      res.status(400).json({
        error: 'Error posting to actions require notes and description'
      });
    }

    const action = await Actions.update(req.params.id, req.body);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ error: 'Error updating action' });
  }
});

router.delete('/:id/actions/:id', async (req, res) => {
  try {
    action = await Actions.remove(req.params.id);
    res.status(200).json({ action });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting action from DB' });
  }
});

module.exports = router;
