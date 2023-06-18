const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 1000,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dbserve2',
    multipleStatements: true
})

module.exports = function fn (sql) {
    return new Promise((reslove, reject) => {
        pool.getConnection(function (err, connection) {
            // if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error)
                    // throw error
                };
                // console.log('数据库连接成功');
                connection.release(); //释放连接
                reslove(results);
            });
        });
    })
}