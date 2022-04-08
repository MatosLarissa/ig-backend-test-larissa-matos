import knex from "knex";
import dotenv from "dotenv"

dotenv.config()

export abstract class BaseDatabase {

    static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            multipleStatements: true
        }
    })

    static async destroyConnection(): Promise<void>{
      if(BaseDatabase.connection){
          await BaseDatabase.connection.destroy();
          BaseDatabase.connection = null;
          console.log("The connection was closed.")
      }
  }
}