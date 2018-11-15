import Deployment from '../api/deployment/depModel'
import Agent from '../api/agents/agentModel'
import _ from 'lodash';
import logger from './logger';
// let Post = require('../api/post/postModel');

logger.log('Seeding the Database');

let deployments = [
    {
        "description": "ISU Demo 1",
        "active": true,
        "agentCount": 4,
        "agentIssues": false,
        "id": "1",
        "softwareGuid": "{0336F88E-8919-451D-AC35-720B8E4E8B10}",
        "phase": "1",
        "packageName": "ISU Demo App1",
        "installedPCs": 10,
        "totalPCs": 4
    },
    {
        "description": "Demo 2",
        "active": false,
        "agentCount": 4,
        "agentIssues": true,
        "id": "2",
        "softwareGuid": "{0336F88E-8919-451D-AC35-720B8E4E8B11}",
        "phase": "1",
        "packageName": "ISU Demo App2",
        "installedPCs": 0,
        "totalPCs": 4
    },
    {
        "description": "Demo 3",
        "active": false,
        "agentCount": 7,
        "agentIssues": true,
        "id": "3",
        "softwareGuid": "{0336F88E-8919-451D-AC35-720B8E4E8B12}",
        "phase": "1",
        "packageName": "ISU Demo App3",
        "installedPCs": 0,
        "totalPCs": 4
    }
];

let agents=[
    {
        "systemGuid": "1B6BEC49BD57FB4A7603809901CC1ECB",
        "PCName": "TEST_PC_0",
        "lastCheckin": "1506567242",
        "cNumber": "C100000",
        "isActive": false
    },
    {
        "systemGuid": "38E76ACD9A78C2F1224C07F752ACA449",
        "PCName": "TEST_PC_1",
        "lastCheckin": "1506567248",
        "cNumber": "C100000",
        "isActive": false
    },
    {
        "systemGuid": "4A6C44BE76DF8444238A4730A050AB11",
        "PCName": "TEST_PC_1",
        "lastCheckin": "1506443770",
        "cNumber": "C100000",
        "isActive": false
    },
];

let posts = [
  {title: 'Learn angular 2 today', text: 'Angular to is so dope'},
  {title: '10 reasons you should love IE7', text: 'IE7 is so amazing'},
  {title: 'Why we switched to Go', text: 'go is dope'}
];

let createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

let cleanDB = function() {
  logger.log('... cleaning the DB');
  let cleanPromises = [Deployment,Agent]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
};

// let createDeployments = function(data) {
//
//   let promises = deployments.map(function(user) {
//     return createDoc(Deployment, user);
//   });
//
//   return Promise.all(promises)
//     .then(function(deployments) {
//       return _.merge({deployments: deployments}, data || {});
//     })
// }

let createAgents = function(data) {
  let promises = agents.map(function(agent) {
    return createDoc(Agent, agent);
  });

  return Promise.all(promises)
    .then(function(agents) {
      return _.merge({agents: agents}, data || {});
    })
};

let createDeployments = function(data) {
  let addAgents = function(deployment, agent) {
    deployment.agents.push(agent);

    return new Promise(function(resolve, reject) {
      post.save(function(err, saved) {
        return err ? reject(err) : resolve(saved)
      });
    });
  };

  let newDeployments = deployments.map(function(deployment) {
    return createDoc(Deployment, deployment);
  });

  return Promise.all(newDeployments)
    .then(function(savedDeployments) {
      return Promise.all(savedDeployments.map(function(deployment, i){
        return addAgents(deployment, data.agents[i])
      }));
    })
    .then(function() {
      return 'Seeded DB with 3 Posts, 3 Deployments, 3 Categories';
    });
};

cleanDB()
  // .then(createDeployments)
  .then(createAgents)
  .then(createDeployments)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
