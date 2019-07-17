const mysql = require("mysql");

connection = mysql.createConnection({
  host            : process.env.DATABASE_HOST,
  port            : process.env.MYSQL_PORT,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DATABASE
});

let reservationModel = {};
reservationModel.getReservations = callback => {
  if (connection) {
    connection.query("SELECT * FROM reservations ORDER BY id", (err, rows) => {
      if (err) {
        throw err;
      } else {
        callback(null, rows);
      }
    });
  }
};

reservationModel.insertReservation = (reservData, callback) => {
  if (connection) {
    connection.query(
      "INSERT INTO reservations SET ?",
      reservData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {
            insertId: result.insertId
          });
        }
      }
    );
  }
};

reservationModel.updateReservation = (reservData, callback) => {
  if (connection) {
    const sql = `
        UPDATE reservations SET
        quantity= ${connection.escape(reservData.quantity)},
        id_user= ${connection.escape(reservData.id_user)},
        id_event= ${connection.escape(reservData.id_event)}
        WHERE id = ${connection.escape(reservData.id)}`;

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        callback(null, {
          message: "success"
        });
      }
    });
  }
};

reservationModel.deleteReservation = (id, callback) => {
  if (connection) {
    let sql = `
      SELECT * FROM reservations WHERE id = ${connection.escape(id)}`;
    connection.query(sql, (err, row) => {
      if (row) {
        let sql = `DELETE FROM reservations WHERE id = ${id}`;
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
};

module.exports = reservationModel;
