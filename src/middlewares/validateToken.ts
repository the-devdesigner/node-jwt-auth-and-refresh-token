import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const validateAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.signedCookies) return res.status(401).json({ message: "Unauthorized" });
    const { TOKEN } = req.signedCookies;
    try {
        const validUser = verify(TOKEN, process.env.AUTH_TOKEN_SECRET as string, {
            complete: true,
        });
        if (!validUser) {
            return res.status(403).json({ message: "Invalid credentials" });
        }
        req.user = validUser;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send((err as Error).message);
    }
};

export const validateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {};
