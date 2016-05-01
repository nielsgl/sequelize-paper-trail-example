'use strict';

const Hapi = require('hapi');
var models =  require('./models');
var sequelize_fixtures = require('sequelize-fixtures');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        return reply('Hello,! World!');
    }
});

var seed = true;

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }

    // sync sequelize db
    models.sequelize.sync({force: seed})
    .then(function() {
        // console.log(something)

        if(seed) {
            console.log('perform db seeding')
            sequelize_fixtures.loadFile('./fixtures/users.js', models).then(function(){
                console.log('done with seeding');
            });
        }

        console.log('Server running at:', server.info.uri);
    });

});