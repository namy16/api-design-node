import Deployment from './depModel';
import _ from 'lodash';

let id = 3;

export const params = (req, res, next, id)=> {
  Deployment.findOne({id})
    .populate('agents')
    .then((deployment)=> {
        if (!deployment) {
            next(new Error('No deployment with that id'));
        } else {
            req.deployment = deployment;
            next();
        }
    }, (err)=> {
      next(err);
    });
};

export const get = (req, res, next)=> {
  Deployment.find({})
    .populate('agents')
    .exec()
    .then(deployments => {
      res.json(deployments);
    }, err => {
      next(err);
    });
};

export const getOne = (req, res, next)=> {
  let deployment = req.deployment;
  res.json(deployment);
};

export const getAssignedAgents = (req, res, next)=> {
    let deployment = req.deployment;
    res.json(deployment.agents);
};

export const addToDep = (req, res, next)=> {
    let deployment = req.deployment;

    let update = req.body;

    console.log(deployment);
    console.log(update);

    // deployment.agents.concat(update);

    _.merge(deployment.agents, update);

    deployment.save((err, saved)=> {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};


export const put = (req, res, next)=> {
  let deployment = req.deployment;

  let update = req.body;

  _.merge(deployment, update);

  deployment.save((err, saved)=> {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

export const post = (req, res, next)=> {

    if (!req.body.id) {
        id++;
        req.body.id = id + '';
    }
  let newDeployment = new Deployment(req.body);
  newDeployment.save((err, deployment)=> {
    if(err) {next(err);}
    else
      res.json(deployment);
  });
};

export const deleteDep = (req, res, next)=> {
  req.deployment.remove((err, removed)=> {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
