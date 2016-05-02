"use strict";

const Hapi = require("hapi");
var models = require("./models");
var sequelize_fixtures = require("sequelize-fixtures");

var debug = false;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: "localhost",
    port: 8000
});

// Add the route
server.route({
    method: "GET",
    path: "/",
    handler: function (request, reply) {
        return reply("Hello, World!");
    }
});

server.route({
    method: "GET",
    path: "/users",
    handler: function (request, reply) {
        models.User.findAll().then(function(users) {
            return reply(users.map(function (user) {
                return user.toJSON();
            }));
        })
    }
});

server.route({
    method: "GET",
    path: "/users/increment_age",
    handler: function (request, reply) {
        models.User.findById(request.query.user_id).then(function(user) {
            if (user) {
                user.update({
                    age: user.age + 1,
                    first_name: request.query.first_name
                }).then(function (user) {
                    return reply(user);
                });
            }
        });
    }
});

server.route({
    method: "GET",
    path: "/users/revisions",
    handler: function (request, reply) {
        models.User.findById(request.query.user_id, {
            include: [{model: models.Revision, include: [models.RevisionChange]}]
        }).then(function(user) {
            return reply(user);
        });
    }
});

server.route({
    method: "GET",
    path: "/revisions",
    handler: function (request, reply) {
        models.Revision.findAll().then(function(revisions) {
            return reply(revisions.map(function (revision) {
                return revision.toJSON();
            }));
        });
    }
});

server.route({
    method: "GET",
    path: "/revisions/users",
    handler: function (request, reply) {
        models.Revision.findAll({
            where: {
                model: 'User'
            }
        }).then(function(revisions) {
            return reply(revisions.map(function (revision) {
                return revision.toJSON();
            }));
        });
    }
});

server.route({
    method: "GET",
    path: "/revisions/users/first_name",
    handler: function (request, reply) {
        models.Revision.findAll({
            where: {
                model: 'User'
            },
            include: [{
                model: models.RevisionChange,
                where: {
                    path: 'first_name'
                }
            }]
        }).then(function(revisions) {
            return reply(revisions.map(function (revision) {
                return revision.toJSON();
            }));
        });
    }
});

server.route({
    method: 'GET',
    path: '/test',
    handler: function(request, reply) {
        console.log(models.User.associations)
        console.log(models.Post.associations)
        console.log(models.Revision.associations)
        console.log(models.RevisionChange.associations)
        return reply({})
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }

    // sync sequelize db
    models.sequelize.sync({force: true})
    .then(function () {
        models.User.findAll().then(function(users) {
            if (!users.length) {
                if (debug) {
                    console.log("perform db seeding");
                }
                sequelize_fixtures.loadFile("./fixtures/users.js", models).then(function () {
                    if (debug) {
                        console.log("done with seeding");
                    }
                });
            }
        });

        console.log("Server running at:", server.info.uri);
    });
});
