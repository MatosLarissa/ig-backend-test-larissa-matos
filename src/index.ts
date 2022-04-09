import { app } from "./Data/server"
import { taskRouter } from "./Router/Task/taskRouter"
import { userRouter } from "./Router/User/userRouter"

app.use('/user', userRouter)
app.use('/task', taskRouter)