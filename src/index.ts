import { app } from "./Data/server"
import { userRouter } from "./Router/User/userRouter"

app.use('/user', userRouter)
