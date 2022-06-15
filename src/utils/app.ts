import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { AuthRoute } from '../routes'
import { Jwt } from 'jsonwebtoken'

const app: Application = express()

declare global {
    namespace Express {
        interface Request {
            user: Jwt;
        }
    }
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET as string))

app.use('/api/auth/', AuthRoute)

app.get('/api', async (req: Request, res: Response) => {
    return res.status(200).json({
        message: "You just landed on the root path of this api"
    })
})

export default app