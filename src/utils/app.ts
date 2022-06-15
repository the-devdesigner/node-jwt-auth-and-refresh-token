import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import { AuthRoute } from '../routes'
import { ResponseMessage } from '../interfaces/ResponseMessage'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth/', AuthRoute)

app.get('/api', async(req: Request, res: Response) => {
    const message: ResponseMessage = {
        message: "You just landed on the root path of this api"
    }
    res.status(200).json(message)
})

export default app