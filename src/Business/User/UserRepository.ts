import { User } from "../../Model/User/User"

export interface UserRepository {
    createUser(user: User): Promise<User>
    getUserByEmail(email: string): Promise<User | null>
    getUserByCpf(cpf: number): Promise<User | null>
}