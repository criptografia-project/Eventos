const mysql = require('mysql');

connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
  });

let eventModel = {};
eventModel.getEvents = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM events ORDER BY id',
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}

eventModel.insertEvent = (eventData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO events SET ?', eventData,
            (err, result) => {
                if (err) {
                    throw err
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
}

eventModel.updateEvent = (eventData, callback) => {
    if (connection) {
        const sql = `
        UPDATE events SET 
        name = ${connection.escape(eventData.name)},
        location = ${connection.escape(eventData.location)},
        date = ${connection.escape(eventData.date)}, 
        capacity= ${connection.escape(eventData.capacity)}, 
        audence= ${connection.escape(eventData.audence)},
        description = ${connection.escape(eventData.description)}, 
        tipo= ${connection.escape(eventData.tipo)} 
        WHERE id = ${connection.escape(eventData.id)}`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err
            } else {
                callback(null, {
                    "message": "success"
                })
            }
        })
    };
}

eventModel.deleteEvent = (id, callback) => {
    if (connection) {
        let sql = `
        SELECT * FROM events WHERE id = ${connection.escape(id)}`;
        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `DELETE FROM events WHERE id = ${id}`;
                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err
                    } else {
                        callback(null, {
                            "message": "deleted"
                        })
                    }
                })
            } else {
                callback(null, {
                    "message": "not exists"
                })
            }
        })
    }
}

module.exports = eventModel;