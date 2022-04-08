import { Request, Response } from "express";
import UserBusiness from "../../Business/User/UserBusiness";
import UserDatabase from "../../Data/User/UserDatabase";
import { LoginInputDTO, SignupInputDTO, UpdateNameInputDTO } from "../../Model/User/User";

export class UserController {

    private userBusiness: UserBusiness
    constructor() {
        this.userBusiness = new UserBusiness(new UserDatabase)
    }

    signup = async (req: Request, res: Response) => {

        const signupInput: SignupInputDTO = {
            name: req.body.name,
            lastName: req.body.lastName,
            cpf: req.body.cpf,
            email: req.body.email,
            password: req.body.password
        }

        try {

            const result = await this.userBusiness.signup(signupInput)

            res.status(201).send({
                message: "User created successfully",
                result
            })

        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }

    }

    login = async (req: Request, res: Response) => {

        const loginInput: LoginInputDTO = {
            email: req.body.email,
            password: req.body.password
        }

        try {

            const token = await this.userBusiness.login(loginInput)

            res.status(200).send({ token })
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }

    }

    updateName = async (req: Request, res: Response) => {

        const updateInput: UpdateNameInputDTO = {
            token: req.headers.authorization,
            name: req.body.name,
            lastName: req.body.lastName
        }

        try {

            const token = await this.userBusiness.updateName(updateInput)

            res.status(200).send({
                message: "Name successfully updated!",
                token
            })
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }

    }

}