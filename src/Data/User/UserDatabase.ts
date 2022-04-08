import { UserRepository } from "../../Business/User/UserRepository";
import { CustomError } from "../../Error/CustomError";
import { User } from "../../Model/User/User"
import { BaseDatabase } from "../BaseDatabase";


export default class UserDatabase extends BaseDatabase implements UserRepository {
    protected TABLE_NAME = "User"

    createUser = async (user: User) => {
        try {
            const result: User[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .insert({
                    "id": user.getId(),
                    "name": user.getName(),
                    "last_name": user.getLastName(),
                    "cpf": user.getCpf(),
                    "email": user.getEmail(),
                    "password": user.getPassword(),
                })
                return result[0] && User.toUserModel(result[0])
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
        await BaseDatabase.destroyConnection()
    }

    getUserByEmail = async (email: string) => {
        try {
            const result: User[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ email })
            return result[0] && User.toUserModel(result[0])
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
        await BaseDatabase.destroyConnection()
    }

    getUserByCpf = async (cpf: number) => {
        try {
            const result: User[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ cpf })
            return result[0] && User.toUserModel(result[0])

        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
        await BaseDatabase.destroyConnection()
    }

    getUserById = async (id: string) => {
        try {
            const result: User[] = await BaseDatabase
                .connection(this.TABLE_NAME)
                .select()
                .where({ id })
            return result[0] && User.toUserModel(result[0])

        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
        await BaseDatabase.destroyConnection()
    }

}