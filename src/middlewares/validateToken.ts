import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const validateAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.signedCookies) return res.status(401).json({ message: "Unauthorized" });
    const AUTH_TOKEN = req.signedCookies.AUTHTOKEN;
    console.log(req.signedCookies);
    console.log(AUTH_TOKEN);
    try {
        const validUser = verify(AUTH_TOKEN, process.env.AUTH_TOKEN_SECRET as string, {
            complete: true,
        });
        if (!validUser) {
            return res.status(403).json({ message: "Invalid credentials" });
        }
        req.user = validUser;
        return next();
    } catch (err) {
        return res.status(500).send({ message: (err as Error).message, type: (err as Error).name });
    }
};

export const validateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.signedCookies) return res.status(401).json({ message: "Unauthorized" });
    const REFRESH_TOKEN = req.signedCookies.REFRESHTOKEN;
    try {
        const validRefreshToken = verify(
            REFRESH_TOKEN,
            process.env.REFRESH_TOKEN_SECRET as string,
            { complete: true }
        );
        if (!validRefreshToken) {
            return res.status(403).json({ message: "Token Expired. Login again." });
        }
        req.user = validRefreshToken;
        return next();
    } catch (err) {
        return res.status(500).send({ message: (err as Error).message, type: (err as Error).name });
    }
};
