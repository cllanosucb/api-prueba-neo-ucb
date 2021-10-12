const mariadb = require('mariadb');

const config = {
    host: "localhost", 
    user: "root",
    password: "mariadb",
    database: "prueba", 
    connectionLimit: 5
}

class DBConnector {
    dbconnector = mariadb.createPool(config);

    async query(param) {
        var conn = await this.dbconnector.getConnection();
        var ret = null;

        conn.query(param)
            .then(data => {
                ret = data;
                console.log("==============");
                console.log(data);
                console.log("==============");
                conn.end()
            })
            .catch( err => {
                console.log(err);
                conn.end();
            });
        return ret
    }

}

module.exports = new DBConnector();
