import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { AddressInfo } from "net";
import { taskRouter } from "./Router/Task/taskRouter"
import { userRouter } from "./Router/User/userRouter"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use('/user', userRouter)
app.use('/task', taskRouter)

export const server = app.listen(process.env.PORT || 3333, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`)
  } else {
    console.error(`Failure upon starting server.`)
  }
})