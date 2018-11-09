var envvar = require('envvar');

module.exports = {
  host: envvar.string("MYSQL_HOST", "localhost"),
  user: envvar.string("MYSQL_USER", "root"),
  password: envvar.string("MYSQL_PASSWORD", "password"),
  database: envvar.string("MYSQL_NAME", "dev")
}