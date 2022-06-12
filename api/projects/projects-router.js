// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model.js');
// const {
//     validateProjectId,
//     checkProjectUnique,
//     validateProject
// } = require('./projects-middleware.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log("id", req.body[0].id);
    Projects.get(req.projects)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', (req, res, next) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(err => {
            next(err);
        });
})

router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(err => {
            next(err);
        });
});

router.post('/', (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Missing project data' });
    } else {
        Projects.insert(req.body)
            .then(project => {
                res.status(201).json(project);
            })
            .catch(err => {
                next(err);
            });
    }
})

router.put('/:id', (req, res, next) => {
    if (!req.body.name || !req.body.description || req.body.completed == null) {
        res.status(400).json({ message: 'Missing project data' });
    } else {
        Projects.update(req.params.id, req.body)
            .then(project => {
                if (project) {
                    res.status(200).json(project);
                } else {
                    res.status(404).json({ message: 'Project not found' });
                }
            })
            .catch(err => {
                next(err);
            });
    }
});

router.delete('/:id', (req, res, next) => {
    Projects.remove(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch(err => {
            next(err);
        });
})

module.exports = router;