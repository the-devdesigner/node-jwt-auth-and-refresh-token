import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import { createAuthToken, createRefreshToken } from "../utils/token";
import { JwtPayload } from "jsonwebtoken";

import UserModel from "../models/UserModel";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json("User with this email does not exist");
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) res.status(400).json("Incorrect password");

        const AUTH_TOKEN = createAuthToken(user._id);
        const REFRESH_TOKEN = createRefreshToken(user._id);

        return res
            .status(200)
            .cookie("AUTHTOKEN", AUTH_TOKEN, {
                httpOnly: true,
                signed: true,
                expires: new Date(Date.now() + 10000),
            })
            .cookie("REFRESHTOKEN", REFRESH_TOKEN, {
                httpOnly: true,
                signed: true,
                expires: new Date(Date.now() + 3600000),
            })
            .json({ message: "Logged In" });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const register = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) return res.status(400).json("User with this email already exists");
        const hashPassword = await hash(password, await genSalt(10));
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
        await newUser.save();
        return res.status(200).json({ message: "Registered successfully", data: newUser._id });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        return res.clearCookie("AUTHTOKEN", { signed: true });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const generateNewToken = async (req: Request, res: Response) => {
    const { _id } = req.user.payload as JwtPayload;
    try {
        const AUTH_TOKEN = createAuthToken(_id);
        console.log(AUTH_TOKEN);
        return res
            .status(200)
            .cookie("AUTHTOKEN", AUTH_TOKEN, {
                httpOnly: true,
                signed: true,
                expires: new Date(Date.now() + 10000),
            })
            .json({ message: "Received new token" });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
