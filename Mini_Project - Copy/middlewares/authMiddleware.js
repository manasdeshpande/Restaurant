import JWT from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const requireSignIn = async (req,res,next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization, 
            process.env.JWT_SECRETKEY
        );
        req.user = decode
        next();
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (req,res,next) => {
    try {
        const user = await User.findById(req.user._id)
        if (user.role === 0 ) {
            return res.status(401).send({
                role: user.role,
                success: false,
                message: 'Unauthorized access'
            })
        } else {
            next();
        }

    } catch (error) {
        res.status(401).send({
            success: false,
            error,
            message: 'Admin login error'
        })
    }
}