// add middlewares here related to actions
const Actions = require('./actions-model.js');

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
    .then(result => {
        if(result == null) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        req.actions = result;

        next();
    })
    .catch(err => next(err));
}

module.exports = {
    validateActionId
};