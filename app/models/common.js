const fn = require('./db');

exports.insertOne = (table, data) => {
    let fields = ''
    let fieldsValue = ''

    let index = 0
    for (key in data) {
        if (index != 0) {
            fields += ','
            fieldsValue += ','
        }
        fields += key
        fieldsValue += "'" + data[key] + "'"
        index += 1
    }

    let sql = `INSERT INTO ${table}(${fields}) VALUES (${fieldsValue})`;
    if (sql.length > 300) {
        console.log('如有异常请查看执行sql详情日志')
    }
    else
        console.log('执行sql：', sql)

    return fn(sql);
}

exports.findOne = (table, data) => {
    let where = ''

    let index = 0
    for (key in data) {
        if (index == 0) {
            where += ' WHERE '
        }
        if (index != 0) {
            where += ' and '
        }
        where += key + '=' + `'${data[key]}'`
        index += 1
    }

    let sql = `SELECT * FROM ${table} ${where}`
    console.log('执行sql：', sql)

    return fn(sql)
}

exports.findMany = (table, data) => {
    let where = ''

    let index = 0
    for (key in data) {
        if (index == 0) {
            where += ' WHERE '
        }
        if (index != 0) {
            where += ' and '
        }
        where += key + '=' + `'${data[key]}'`
        index += 1
    }

    let sql = `SELECT * FROM ${table} ${where}`;
    console.log('执行sql：', sql)

    return fn(sql);
}

exports.deleteOne = (table, data) => {
    let where = ''

    let index = 0
    for (key in data) {
        if (index == 0) {
            where += ' WHERE '
        }
        if (index != 0) {
            where += ' and '
        }
        where += key + '=' + `'${data[key]}'`
        index += 1
    }

    let sql = `DELETE FROM ${table} ${where}`;
    console.log('执行sql：', sql)

    return fn(sql)
}

exports.updateOne = (table, data) => {
    let fieldsJSON = data.new
    let whereJSON = data.old
    let fields = ''
    let where = ''

    let index = 0
    for (key in fieldsJSON) {
        if (index != 0) {
            fields += ','
        }
        fields += key + '=' + `'${fieldsJSON[key]}'`
        index += 1
    }

    let indexj = 0
    for (key in whereJSON) {
        if (indexj == 0) {
            where += ' WHERE '
        }
        if (indexj != 0) {
            where += ' and '
        }
        where += key + '=' + `'${whereJSON[key]}'`
        indexj += 1
    }

    let sql = `UPDATE ${table} SET ${fields} ${where}`;
    console.log('执行sql：', sql)

    return fn(sql);
}

exports.executeSql = (table, data) => {
    let sql = data;
    console.log('执行sql：', sql)

    return fn(sql);
}

