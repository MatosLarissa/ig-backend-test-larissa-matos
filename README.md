# Task Manager API
 
 API represents the task management system


#### 📋 Documentação: https://documenter.getpostman.com/view/18385856/UVyxRZv6


## First steps

#### To run in a docker container:
 - $ docker run --name MyContainer -p 3333:3333 -d larissamo/dockernode
* URL base: http://localhost:3333


#### To clone this repository
* Run `npm install` to add the dependencies
* Create an .env file at the project root and fill in the following keys with the appropriate values:
   ```
    PORT =
    DB_PORT =
    DB_HOST = 
    DB_USER = 
    DB_PASSWORD = 
    DB_SCHEMA = 
    JWT_KEY = 
    ACCESS_TOKEN_EXPIRES_IN = 
    BCRYPT_COST = 

   ```

* Run `npm run migrations` to add the tables to the database (if successful, the server will be ready to receive requests) 

## 🛠️ Technologies used:

→ MySql;

→ Express;

→ Knex;

→ Node.js:

→ Typescript;

→ Dotenv;

→ Cors;

→ BCRYPT;

→ UUID;

→ JWToken;

<br/>



## Requirements:

<ol>
  <li> The User can only change the username of his registration. </li>
  <li> The User can create the tasks, can modify the date of the task and the title and can delete tasks, only tasks linked to it. </li>
  <li> The user cannot view or change other users' tasks. </li>
  <li> It must be possible to list tasks by id and status. </li>
  <li> It must be possible to change the status of the task between true and false. </li>
  <li> The login must be done via e-mail and password. </li>
  <li> You cannot have duplicate CPF and e-mail in the registration. </li>
</ol>
<br><br>

### Example of registration objects

#### Users 

```
{
  id: uuid,
  nome: string, 
  sobrenome: string,
  CPF: number,
  e-mail string:,
}
```

<br>

#### Tasks

```
{
  id: uuid,
  created_at: date,
  title: string,
  done: boolean,
  date: date,
} 
```

<br>

## Technologies:

<ol> 
  <li> The password must be validated via hash (salt + pass = hash for validation and jwt).  </li>
  <li> The login must return a token to be used in the other routes.  </li>
  <li> Access to application routes (with the exception of user registration), must be done by passing the token obtained at login via Auth - Bearer Token in the request.  </li>
  <li> The api must be REST.  </li>
  <li> TDD. Add the command to run the tests in package.json.</li>
  <li> Database (Postgres / MySQL).  </li>
  <li> Optional - SOLID can be applied in the application.  </li>
  <li> App and database running on Docker.  </li>
</ol>

## Tech:

<p style="text-align: justify;"> The API must be made with Javascript, Typescript to run in NodeJS. </p>

## Delivery: 

<li> Delivery must be made within a maximum of 7 days after delivery of the test repository to your email.  </li>
<li> It must be delivered via feature with your name (Ex.: 'feature/so-and-so'), make the pull request in the repository and in the PR message put your full name and your email.  </li>
<li> In the project stack there must be an insomnia file with the tests configured (routes, urlBase and http methods) for import and evaluation.  </li>



