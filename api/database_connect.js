var mysql = require('mysql');
var constants = require('./keys');

var databaseConnect = {
    getDBConnection: function () {
        return new Promise((res, rej) => {
            const con = mysql.createConnection({
                host: constants.host,
                user: constants.user,
                password: constants.password,
                database: constants.database
            });
            con.connect(function (err) {
                if (err) {
                    console.log(`mysql connection failed trying again in 2 seconds`)
                    databaseConnect.delayRetry(2, databaseConnect.getDBConnection, res, rej)
                } else {
                    console.log(`connected to DB`)
                    res(con);
                }
            });
        })
    },

    delayRetry: function (time, func, resolve, reject) {
        try {
            setTimeout(() => {
                resolve(func());
            }, time * 1000)
        } catch (err) {
            console.log(err);
            reject(err);
        }
    },

    executeQuery: function (con, sql) {
        return new Promise((res, rej) => {
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                res(result);
            });
        })
    },

    getData: async function (con) {
        // var sql = `SELECT * FROM some_table`
        // var results = await databaseConnect.executeQuery(con, sql);
        var results = ["results"];
        if (results.length == 0) {
            throw new Error("No Rows Selected");
        }
        return results;
    }
}
module.exports = databaseConnect;