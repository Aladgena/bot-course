const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telega_bot',
    'root',
    'root',
    {
        host: '192.168.0.78',
        dialect: 'postgres'
    }
)