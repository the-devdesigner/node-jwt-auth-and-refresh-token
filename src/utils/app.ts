import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { AuthRoute } from '../routes'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET as string))

app.use('/api/auth/', AuthRoute)

app.get('/api', async (req: Request, res: Response) => {
    res.status(200).json({
        message: "You just landed on the root path of this api"
    })
})

export default app