var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/geolocalizaciondb-dev'
  },

  test: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/geolocalizaciondb-test'
  },

  production: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/geolocalizaciondb-prod'
  }
};

module.exports = config[env];