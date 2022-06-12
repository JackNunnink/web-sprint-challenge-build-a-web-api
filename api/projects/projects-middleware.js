// add middlewares here related to projects
const Projects = require('./projects-model.js');

function validateProjectId(req, res, next) {
//   console.log("id", req.body[0].id);

  Projects.get(req.params.id)
    .then(result => {
        if(result == null) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        req.project = result;

        next();
    })
    .catch(err => next(err));
}

function checkProjectUnique(req, res, next) {
    Projects.get({name: req.body.name})
        .then(result => {
            if(result.length > 0) {
                res.status(400).json({ message: 'Project already exists' });
                return;
            }
            
            next();
        })
        .catch(err => next(err));
}

function validateProject (req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Missing project data' });
    } 

    req.body = { name: req.body.name.trim(), description: req.body.description.trim() };

    next();
}

module.exports = {
    validateProjectId,
    checkProjectUnique,
    validateProject
};