// var User = require('../api/user/userModel');
// var Post = require('../api/deployment/depModel');
// var Category = require('../api/agents/agentModel');
import Post from '../api/deployment/depModel'
import Category from '../api/agents/agentModel'

var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

// var users = [
//     {username: 'Jimmylo', password: 'test'},
//     {username: 'Xoko', password: 'test'},
//     {username: 'katamon', password: 'test'}
// ];

var categories = [
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

var posts = [
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

var createDoc = function(model, doc) {
    return new Promise(function(resolve, reject) {
        new model(doc).save(function(err, saved) {
            return err ? reject(err) : resolve(saved);
        });
    });
};

var cleanDB = function() {
    logger.log('... cleaning the DB');
    var cleanPromises = [Category, Post]
        .map(function(model) {
            return model.remove().exec();
        });
    return Promise.all(cleanPromises);
}

var createUsers = function(data) {

    var promises = users.map(function(user) {
        return createDoc(User, user);
    });

    return Promise.all(promises)
        .then(function(users) {
            return _.merge({users: users}, data || {});
        });
};

var createCategories = function(data) {
    var promises = categories.map(function(category) {
        return createDoc(Category, category);
    });

    return Promise.all(promises)
        .then(function(categories) {
            return _.merge({categories: categories}, data || {});
        });
};

var createPosts = function(data) {
    var addCategory = function(post, category) {
        // console.log(category);
        post.agents.push(category);

        console.log(post);
        return new Promise(function(resolve, reject) {
            post.save(function(err, saved) {
                return err ? reject(err) : resolve(saved)
            });
        });
    };

    var newPosts = posts.map(function(post, i) {
        // post.author = data.users[i]._id;
        return createDoc(Post, post);
    });

    return Promise.all(newPosts)
        .then(function(savedPosts) {
            return Promise.all(savedPosts.map(function(post, i){
                return addCategory(post, data.categories[i])
            }));
        })
        .then(function() {
            return 'Seeded DB with 3 Posts, 3 Users, 3 Categories';
        });
};

cleanDB()
    // .then(createUsers)
    .then(createCategories)
    .then(createPosts)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger));
