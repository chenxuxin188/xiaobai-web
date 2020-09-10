var mysql = require('mysql');
var config = require('../config.json');

function Db() {
    this.pool = mysql.createPool({
        connectionLimit : 20,
        host: config.db.ip,
        user: config.db.user,
        password: config.db.pswd,
        port: config.db.port,
        database: config.db.db,
        
    });
}
    
Db.prototype.queryGroup = function (group, callback){
    this.pool.getConnection(function(err, connection) {
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed')
            connection.release();
            return;
        }
        const sql = 'SELECT * from `group` WHERE `group`.group=?';
        var value = [parseInt(group)];
        connection.query(sql, value, function (err, result) {
            connection.release();
            if (err) {
                console.log('[queryGroup ERROR] - ', err.message);
            }
            callback(err, result);
        });
    });
}

Db.prototype.getGroups = function (groups, callback){
    this.pool.getConnection(function(err, connection) {
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed')
            connection.release();
            return;
        }
        const sql = 'SELECT * from `group` WHERE `group`.group IN (?)';
        connection.query(sql, [groups], function (err, result) {
            connection.release();
            if (err) {
                console.log('[queryGroup ERROR] - ', err.message);
            }
            callback(err, result);
        });
    });
}

Db.prototype.groupList = function (callback){
    this.pool.getConnection(function(err, connection) {
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed')
            connection.release();
            return;
        }
        const sql = 'SELECT * from `group`';
        connection.query(sql, function (err, result) {
            connection.release();
            if (err) {
                console.log('[queryGroup ERROR] - ', err.message);
            }
            callback(err, result);
        });
    });
}

Db.prototype.updateGroup = function (values, callback){
    this.pool.getConnection(function(err, connection) {
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed')
            connection.release();
            return;
        }
        const sql = 'UPDATE `group` SET `group`.iactCD=?, `group`.setuKey=?, `group`.setu=?, `group`.seturecall=?, `group`.anti=?, `group`.individualCD=?, `group`.groupCD=?, `group`.repeat=?, `group`.antirecall=?, `group`.kouqiu=?, `group`.ban=? WHERE `group`.group=?';
        connection.query(sql, values, function (err, result) {
            connection.release();
            if (err) {
                console.log('[queryGroup ERROR] - ', err.message);
            }
            callback(err, result);
        });
    });
}


Db.prototype.register = function (values,  callback) {
    this.pool.getConnection(function(err, connection) {   
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed');
            connection.release();
            return;
        } 
        const sql = 'INSERT INTO `user` (`username`, `password`) VALUES (?,?)'
        connection.query(sql, values, function (err, result){
            connection.release();
            if (err) {
                console.log('[register ERROR] - ', err.message);
            }
            callback(err,result);
        });
    });
}


Db.prototype.gregister = function (values,  callback) {
    this.pool.getConnection(function(err, connection) {   
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed');
            connection.release();
            return;
        } 
        const sql = 'INSERT INTO `user` (`username`, `password`, `groups`, `qq`) VALUES (?,?,?,?)'
        connection.query(sql, values, function (err, result){
            connection.release();
            if (err) {
                console.log('[register ERROR] - ', err.message);
            }
            callback(err,result);
        });
    });
}

Db.prototype.findUserByAcc = function (value,  callback) {
    this.pool.getConnection(function(err, connection) {   
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed');
            connection.release();
            return;
        } 
        const sql = 'SELECT * from `user` WHERE `user`.username=?'
        values = [value]
        connection.query(sql, values, function (err, result){
            connection.release();
            if (err) {
                console.log('[register ERROR] - ', err.message);
            }
            callback(err,result);
        });
    });
}

Db.prototype.findUserByID = function (value,  callback) {
    this.pool.getConnection(function(err, connection) {   
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed');
            connection.release();
            return;
        } 
        const sql = 'SELECT * from `user` WHERE `user`.id=?'
        values = [value]
        connection.query(sql, values, function (err, result){
            connection.release();
            if (err) {
                console.log('[register ERROR] - ', err.message);
            }
            callback(err,result);
        });
    });
}

Db.prototype.updateUserByID = function (values,  callback) {
    this.pool.getConnection(function(err, connection) {   
        if (err) {
            console.log('[connection ERROR] - ', err.message);
            callback(err, 'connection failed');
            connection.release();
            return;
        } 
        const sql = 'UPDATE `user` SET `user`.groups=? WHERE `user`.id=?'
        connection.query(sql, values, function (err, result){
            connection.release();
            if (err) {
                console.log('[register ERROR] - ', err.message);
            }
            callback(err,result);
        });
    });
}

module.exports = new Db();
