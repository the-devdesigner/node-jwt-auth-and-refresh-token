import { Router } from 'express'
import { AC } from '../controllers'

const router = Router()

router.post('/login', AC.login)
router.post('/register', AC.register)
router.post('/logout', AC.logout)

export default router