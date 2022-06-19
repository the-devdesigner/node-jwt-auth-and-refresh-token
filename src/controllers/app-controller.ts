import { Request, Response } from "express";

export const getSettings = async (req: Request, res: Response) => {
    try {
        res.status(200).send(req.user);
    } catch (err) {
        return res.status(500).json({ message: (err as Error).message });
    }
};
