import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) => {
    return createConnection({
        "name": "default",
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "rcvr-dbuser",
        "password": "R3ceiverDB",
        "database": "rcvr-db-test",
        "synchronize": drop,
        "dropSchema": drop,
        "entities": [
            __dirname + "/../entity/*.*"
        ]
    })
}