import { User } from "../../Model/User/User"

export interface UserRepository {
    createUser(user: User): Promise<User>
}