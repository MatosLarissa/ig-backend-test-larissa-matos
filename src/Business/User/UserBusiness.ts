import { HashManager } from "../../Services/HashManager";
import { IdGenerator } from "../../Services/IdGenerator";
import { UserRepository } from "./UserRepository";
import { Authenticator } from "../../Services/Authenticator";
import { SignupInputDTO, User, } from "../../Model/User/User"
import { CustomError } from "../../Error/CustomError";

export default class UserBusiness {

    private userData: UserRepository
    private hashManager: HashManager
    private idGenerator: IdGenerator
    private authenticator: Authenticator

    constructor(userDataImplementation: UserRepository) {

        this.userData = userDataImplementation
        this.hashManager = new HashManager()
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()

    }

    signup = async (input: SignupInputDTO) => {
        const { name, lastName, cpf, email, password } = input

        if (!name) {
            throw new CustomError(422, "Please, inform a name for new user.")
        }
        if (!lastName) {
            throw new CustomError(422, "Please, inform a last name for new user.")
        }

        if (!cpf) {
            throw new CustomError(422, "Please, inform a cpf for new user.")
        }
  

        if (!email) {
            throw new CustomError(422, "Please, inform a email for new user.")
        }


        if (!password) {
            throw new CustomError(422, "Please, inform a password for new user.")
        }
     



        const id =  this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            lastName,
            cpf,
            email,
            hashPassword
        )

        await this.userData.createUser(user)
        const accessToken = this.authenticator.generateToken({ id })

        return accessToken
    }
}    