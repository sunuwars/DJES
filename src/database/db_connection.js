
const {Pool} = require('pg');
const url = require('url');
require('env2')('./config.env');
const env_db_url = process.env.DB_URL;

if (!env_db_url) throw new Error('Environment variable DB_URL must be set');

const params = url.parse(env_db_url);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password,
  ssl: params.hostname !== 'localhost'
};

module.exports = new Pool(options);