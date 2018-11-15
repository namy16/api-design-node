import Agent from './agentModel';
import _ from 'lodash';

let id = 3;

export const params = (req, res, next, systemGuid)=> {
    Agent.findOne({systemGuid})
        .then((agent)=> {
            if (!agent) {
                next(new Error('No agent with that id'));
            } else {
                req.agent = agent;
                next();
            }
        }, (err)=> {
            next(err);
        });
};

export const get = (req, res, next)=> {
    Agent.find({})
        .then(agents => {
            res.json(agents);
        }, err => {
            next(err);
        });
};

export const getOne = (req, res, next)=> {
    let agent = req.agent;
    res.json(agent);
};

export const put = (req, res, next)=> {
    let agent = req.agent;

    let update = req.body;

    _.merge(agent, update);

    agent.save((err, saved)=> {
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
    let newAgent = new Agent(req.body);
    newAgent.save((err, agent)=> {
        if(err) {next(err);}
        else
            res.json(agent);
    });
};

export const deleteAgent = (req, res, next)=> {
    req.agent.remove((err, removed)=> {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
