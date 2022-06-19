import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export const getSettings = async (req: Request, res: Response) => {
    console.log((req.user.payload as JwtPayload)._id);
    try {
        res.status(200).send(req.user);
    } catch (err) {
        return res.status(500).json({ message: (err as Error).message });
    }
};
