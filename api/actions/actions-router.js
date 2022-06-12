// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model.js');
// const {
//     validateActionId
// } = require('./actions-middleware.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get(req.actions)
        .then(actions => {
            res.status(200).json(actions);
            // console.log(actions[0].id)
        })
        .catch(err => {
            next(err);
        });
})

router.get('/:id', (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            if(action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(err => {
            next(err);
        });
})

router.post('/', (req, res, next) => {
    if(!req.body.notes || !req.body.description) {
        res.status(400).json({ message: 'Missing action data' });
    } else {
        Actions.insert(req.body)
            .then(action => {
                res.status(201).json(action);
            })
            .catch(err => {
                next(err);
            });
    }
});

router.put('/:id', (req, res, next) => {
    if(!req.body.notes || !req.body.description || !req.body.completed || !req.body.project_id) {
        res.status(400).json({ message: 'Missing action data' });
    } else {
        Actions.update(req.params.id, req.body)
            .then(action => {
                if(action) {
                    res.status(200).json(action);
                } else {
                    res.status(404).json({ message: 'Action not found' });
                }
            })
            .catch(err => {
                next(err);
            });
    }
})

router.delete('/:id', (req, res, next) => {
    Actions.remove(req.params.id)
        .then(action => {
            if(action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;