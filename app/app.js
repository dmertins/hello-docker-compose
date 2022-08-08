const mysql = require('mysql');

const host = 'mysql';
const user = 'root';
const password = 'root';
const database = 'nodedb';
const connectionLimit = 10;

initDB();

function initDB() {
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    connection.connect();

    const createTableSQL = 'CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id))';
    connection.query(createTableSQL, function (error, results, fields) {
        if (error) throw error;
        console.log('[initDB] Create "people" table if it does not exist.');
    });

    const insertPersonSQL = 'INSERT INTO people (name) VALUES ("Kléber Bambam")';
    connection.query(insertPersonSQL, function (error, results, fields) {
        if (error) throw error;
        console.log('[initDB] Insert person into "people" table.');
    });

    connection.end();
}

const pool = mysql.createPool({
    connectionLimit: connectionLimit,
    host: host,
    user: user,
    password: password,
    database: database
});


const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    pool.query('SELECT * FROM people', function (error, results, fields) {
        if (error) throw error;
        let html = '<h1>Full Cycle Rocks!</h1><h2>table "people":</h2>';
        for (const person of results) html += `<p>${person.id} ${person.name}</p>`;
        res.send(html);
    });
});

app.listen(port, () => {
    console.log(`[app] Listening on port ${port}.`);
});
