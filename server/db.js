const mysql = require("mysql2/promise");

// Construit la configuration MySQL selon l'environnement.
// En production Railway, une URL complète peut être fournie.
// En local, les variables DB_HOST, DB_USER, DB_PASSWORD et DB_NAME sont utilisées.
function getDatabaseConfig() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const ssl = process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined;

  if (databaseUrl) {
    const url = new URL(databaseUrl);

    return {
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace("/", ""),
      ssl
    };
  }

  return {
    host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT) || 3306,
    user: process.env.DB_USER || process.env.MYSQLUSER || "root",
    password: process.env.DB_PASSWORD ?? process.env.MYSQLPASSWORD ?? "",
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || "blog",
    ssl
  };
}

// Pool de connexions MySQL partagé par tous les repositories.
// Les requêtes utilisent mysql2/promise pour travailler avec async/await.
const pool = mysql.createPool({
  ...getDatabaseConfig(),
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true
});

module.exports = pool;
