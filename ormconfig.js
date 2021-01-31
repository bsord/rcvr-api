module.exports = {
    "name": "default",
    "type": "mysql",
    "host": process.env.DBHOST,
    "port": process.env.DBPORT,
    "username": process.env.DBUSER,
    "password": process.env.DBPASS,
    "database": process.env.DBNAME,
    "synchronize": true,
    "logging": true,
    "entities": [
        "src/entity/*.*"
    ],
    seeds: ['src/seeds/**/*{.ts,.js}'],
    factories: ['src/factories/**/*{.ts,.js}'],
 }
