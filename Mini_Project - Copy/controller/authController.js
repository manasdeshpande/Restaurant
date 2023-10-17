import JWT from 'jsonwebtoken';
import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import { User } from '../models/userModel.js';

export const registerController = async (req,res) => {
    try {
        const {email,password,phone,address,firstname,lastname} = req.body;
        if(!email) {
            return res.send({message:"Email is required"})
        }
        if(!password) {
            return res.send({message:"Password is required"})
        }
        if(!phone) {
            return res.send({message:"Phone number is required"})
        }
        if(!firstname) {
            return res.send({message:"First name is required"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Email is already registered. Please Login or enter different email'
            })
        }

        const hashedPassword = await hashPassword(password)
        
        const user = await new User({email,phone,address,firstname,lastname,password:hashedPassword}).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
}


export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Error in login',
            })
        }

        const user = await User.findOne({email})
        if (!user){
            return res.status(404).send({
                success:false,
                message:'User not found. Sign Up to create user'
            })
        }

        const match = await comparePassword(password, user.password)
        if(!match) {
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRETKEY, {expiresIn: '7d'});
        res.status(200).send({
            success:true,
            message:`${user.email} has logged in successfully.`,
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                id: user._id,
                firstname: user.firstname,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}