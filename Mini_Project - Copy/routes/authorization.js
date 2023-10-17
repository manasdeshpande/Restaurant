import express from 'express'
import { loginController, registerController } from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js' 

const router = express.Router()

router.post('/register', registerController)

router.post('/login',loginController)

router.get('/user', requireSignIn, (req,res) => {
    res.status(200).send({
        message: "User logged in",
        ok: true})
})

router.get('/admin', requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({
        message:"Admin logged in",
        ok: true})
})

export default router;