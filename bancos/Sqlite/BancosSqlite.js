import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'buzz.db' });


function initBancos() {
    return new Promise((resolve, reject) => {
        db.transaction((txn0) => {
            txn0.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='bancos'",
                [],
                (tx1, res1) => {
                    if (res1.rows.length == 0) {
                        tx1.executeSql('DROP TABLE IF EXISTS bancos', [],
                            (tx3) => {
                                tx3.executeSql(
                                    'CREATE TABLE IF NOT EXISTS bancos(' +
                                    'url TEXT, ' +
                                    'description TEXT, ' +
                                    'age TEXT, ' +
                                    'bankName TEXT)',
                                    [],
                                    function () {
                                        resolve({ msg: 'Exitoso.' });
                                    },
                                    function (tx6, err6) {
                                        reject({ msg: 'error' + err6 });
                                    },
                                    function (tx4, res4) {
                                        reject({ msg: 'error.' + tx4 + res4 });
                                    }

                                );
                            }
                        )
                    } else {
                        resolve({ msg: 'La tabla ya existe.' });
                    }
                },
                function (tx2, err2) {
                    reject({ tx: tx2, err: err2, msg: 'Error 2' });
                }
            );
        });
    });
};

function guardarBancos(url, description, age, bankName) {
    return new Promise((resolve, reject) => {
        console.log('saveRespuestas');
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT OR REPLACE INTO bancos ' +
                '(url, description, age, bankName) ' +
                'VALUES (?,?,?,?)',
                [url, description, age, bankName],
                (tx, results) => {
                    console.log('guardar bancos', results);
                    resolve(true);
                },
                (err) => {
                    console.log('error' + JSON.stringify(err));
                    reject({
                        mensajeError: 'error respuestas'
                    });
                    return err
                }
            );
        });
    });
};

function recuperarBancosSql(order) {
    return new Promise((resolve, reject) => {
        if (order == null) {
            order = 'id';
        }
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM bancos ORDER BY ?',
                [order],
                (tx, results) => {
                    if (results.rows.length !== 0) {
                        var tempDataArray = [];
                        for (var i = 0; i < results.rows.length; i++) {
                            tempDataArray.push({
                                bankName: results.rows.item(i).bankName,
                                url: results.rows.item(i).url,
                                age: results.rows.item(i).age,
                                description: results.rows.item(i).description,
                            });
                        }
                        resolve(tempDataArray);
                    } else {
                        console.log('Error');
                        var tempDataArray = [];
                        resolve(tempDataArray);
                    }
                },
                (tx, err) => {
                    console.log('error', tx);
                    reject({
                        mensajeError: 'Ocurrió un error al recuperar datos checking'
                    });
                }
            );
        });
    });
}

const methods = {
    initBancos,
    guardarBancos,
    recuperarBancosSql
};

module.exports = methods;