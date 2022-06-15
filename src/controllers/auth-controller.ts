import { Request, Response } from "express";
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import UserModel from "../models/UserModel";

export const login = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).json({ message: "Required data is missing" })
    if (!req.body.email) return res.status(400).json({ message: "Email is required!" })
    if (!req.body.password) return res.status(400).json({ message: "Password is required!" })

    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (!user) return res.status(400).json("User with this email does not exist")
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) res.status(400).json("Incorrect password")
        const TOKEN = sign({ _id: user._id }, process.env.TOKEN_SECRET as string, {
            noTimestamp: false,
            algorithm: "HS512",
        })
        return res.status(200).cookie('TOKEN', TOKEN, {
            httpOnly: true,
            signed: true,
            expires: new Date(Date.now() + 3600000)
        }).json({ message: "Logged In", data: user._id })
    } catch (err) {
        console.error(`Login error: ${err}`)
        return res.status(500).json({ message: (err as Error).message })
    }
}
export const register = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).json({ message: "Required data is missing" })
    if (!req.body.email) return res.status(400).json({ message: "Email is required!" })
    if (!req.body.password) return res.status(400).json({ message: "Password is required!" })
    if (!req.body.firstName) return res.status(400).json({ message: "First Name is required!" })
    if (!req.body.lastName) return res.status(400).json({ message: "Last Name is required!" })

    const { email, password, firstName, lastName } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (user) return res.status(400).json("User with this email already exists")
        const hashPassword = await hash(password, await genSalt(10))
        const newUser = new UserModel({
            firstName, lastName, email, password: hashPassword
        })
        await newUser.save()
        return res.status(200).json({ message: "Registered successfully", data: newUser._id })
    } catch (err) {
        console.error(`Register error: ${err}`)
        return res.status(500).json({ message: (err as Error).message })
    }
}
export const logout = async (req: Request, res: Response) => {
    try { return res.clearCookie("TOKEN") } catch (err) {
        console.error(`Register error: ${err}`)
        return res.status(500).json({ message: (err as Error).message })
    }
}
