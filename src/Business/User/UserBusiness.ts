import { HashManager } from "../../Services/HashManager";
import { IdGenerator } from "../../Services/IdGenerator";
import { UserRepository } from "./UserRepository";
import { Authenticator } from "../../Services/Authenticator";
import { LoginInputDTO, SignupInputDTO, User, } from "../../Model/User/User"
import { CustomError } from "../../Error/CustomError";
import { ValidateInput } from "../../Services/ValidateInput";

export default class UserBusiness {

    private userData: UserRepository
    private hashManager: HashManager
    private idGenerator: IdGenerator
    private authenticator: Authenticator
    private validateInput: ValidateInput


    constructor(userDataImplementation: UserRepository) {

        this.userData = userDataImplementation
        this.hashManager = new HashManager()
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
        this.validateInput = new ValidateInput()


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
        if (this.validateInput.certifyCpf(cpf) === false) {
            throw new CustomError(422, "Invalid cpf, needs eleven numbers.")
        }

        if (!email) {
            throw new CustomError(422, "Please, inform a email for new user.")
        }
        if (this.validateInput.certifyEmail(email) === false) {
            throw new CustomError(422, "Invalid email.")
        }

        if (!password) {
            throw new CustomError(422, "Please, inform a password for new user.")
        }
        if (this.validateInput.certifyPassword(password) === false) {
            throw new CustomError(422, "Invalid password, needs at least six characters, at least one letter and one number.")
        }

        const searchingExistingEmail = await this.userData.getUserByEmail(email)
        if (searchingExistingEmail) {
            throw new CustomError(409, "This e-mail is already in use.")
        }
        const searchingExistingCpf = await this.userData.getUserByCpf(cpf)
        if (searchingExistingCpf) {
            throw new CustomError(409, "This cpf is already in use.")
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

    login = async (input: LoginInputDTO) => {
        const { email, password } = input

        if (!email) {
            throw new CustomError(422, "Please, inform a email.")
        }
        if (!password) {
            throw new CustomError(422, "Please, inform a password.")
        }

        const user = await this.userData.getUserByEmail(email)
        if (!user) {
            throw new CustomError(404, "User not found.")
        }

        const verifyPassword = await this.hashManager.compare(password, user!.getPassword())
        if (!verifyPassword) {
            throw new CustomError(403, "Invalid password")
        }

        const accessToken = this.authenticator.generateToken({ id: user!.getId() })

        return accessToken
    }
    
}    