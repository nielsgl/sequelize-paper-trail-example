# sequelize-paper-trail-example

> A demo implementation of Sequelize Paper Trail module.

[![node-version](https://img.shields.io/node/v/sequelize-paper-trail.svg)]()
[![npm-version](https://img.shields.io/npm/v/sequelize-paper-trail.svg)]()
[![David](https://img.shields.io/david/nielsgl/sequelize-paper-trail-example.svg?maxAge=3600)]()
[![David](https://img.shields.io/david/dev/nielsgl/sequelize-paper-trail-example.svg?maxAge=3600)]()

[![GitHub release](https://img.shields.io/github/release/nielsgl/sequelize-paper-trail-example.svg)](https://www.npmjs.org/package/sequelize-paper-trail-example)
[![GitHub tag](https://img.shields.io/github/tag/nielsgl/sequelize-paper-trail-example.svg)](https://www.npmjs.org/package/sequelize-paper-trail-example)
[![GitHub commits](https://img.shields.io/github/commits-since/nielsgl/sequelize-paper-trail-example/0.0.1.svg)]()

[![license](https://img.shields.io/github/license/nielsgl/sequelize-paper-trail-example.svg)](https://github.com/nielsgl/sequelize-paper-trail-example/blob/master/LICENSE)

## Installation

```bash
git clone https://github.com/nielsgl/sequelize-paper-trail-example.git
cd sequelize-paper-trail-example
npm install
```

## Starting the app
Run
```bash
gulp
```
from the command line and the app will start at `http://localhost:8000`
## Documentation

### Endpoints

```
GET http://localhost:8000/
```
Prints a pretty `Hello, World!` message.

```
GET http://localhost:8000/users
```
Shows a list of users from the seed data.

```
GET http://localhost:8000/users/increment_age?user_id=[user_id]&first_name=[first name]
```
Enables you to simply increment the age of a user with id `[user_id]` and sets the first name of the user to `[first_name]`, this will trigger updates to the revision trail for that user.

```
GET http://localhost:8000/users/revisions?user_id=[user_id]
```

Shows the revision history and changes to each attribute for the user with id = `[user_id]`

```
GET http://localhost:8000/revisions
```
Shows the full paper trail.

```
GET http://localhost:8000/revisions/users
```
Shows the full paper trail for all instances of the User model.

```
GET http://localhost:8000/revisions/users/first_name
```
Shows the full paper trail of all instances of the User model where the `first_name` attribute has changed.


## Author

Copyright (c) [Niels van Galen Last](https://nielsgl.com) – [@nielsgl](https://twitter.com/nielsgl) – nvangalenlast@gmail.com
Distributed under the MIT license. See ``LICENSE`` for more information.
[https://github.com/nielsgl/sequelize-paper-trail-example](https://github.com/nielsgl/)