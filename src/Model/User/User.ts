export class User {
    constructor(
        private id: string,
        private name: string,
        private lastName: string,
        private cpf: number,
        private email: string,
        private password: string
    ) { }

    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getLastName() {
        return this.lastName
    }
    getCpf() {
        return this.cpf
    }
    getEmail() {
        return this.email
    }
    getPassword() {
        return this.password
    }

    setName(name: string) {
        this.name = name
    }
    setPassword(password: string) {
        this.password = password
    }

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.lastName, user.cpf, user.email, user.password)
    }
}

export type SignupInputDTO = {
    name: string;
    lastName: string;
    cpf: number;
    email: string;
    password: string;
}

export type UpdateNameInputDTO = {
    token: string;
    name: string;
    lastName: string;
}

export type LoginInputDTO = {
    email: string;
    password: string;
}