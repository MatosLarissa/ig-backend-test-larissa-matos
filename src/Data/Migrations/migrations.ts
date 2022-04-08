import { BaseDatabase } from "../BaseDatabase";
import user from "./user.json"
import task from "./task.json"


const printError = (error: any) => { console.log(error.sqlMessage || error.message) }


const createTables  = () => BaseDatabase.connection
    .raw(`
    CREATE TABLE IF NOT EXISTS User(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        cpf BIGINT NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS Task(
        id VARCHAR(255) PRIMARY KEY,
        created_at DATE NOT NULL,
        title VARCHAR(255) NOT NULL,
        done BOOLEAN NOT NULL,
        date DATE NOT NULL,
        author_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (author_id) REFERENCES User(id)
    );
`)

    .then(() => { console.log("Tables has been created!") })
    .catch(printError)

const insertUser = () => BaseDatabase.connection("User")
    .insert(user)
    .then(() => { console.log("Users has been created!") })
    .catch(printError)

const insertTask = () => BaseDatabase.connection("Task")
    .insert(task)
    .then(() => { console.log("Tasks has been created!") })
    .catch(printError)

const closeConnection = () => { BaseDatabase.connection.destroy() }

createTables()
   .then(insertUser)
   .then(insertTask)
   .finally(closeConnection)