import {Router} from 'express'
import {AC} from '../controllers'

const router = Router()

router.post('/login', AC.login)

export default router