import { Request, Response, NextFunction } from "express";

export const validateLoginBody = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.status(400).json({ message: "Required data is missing" });
    if (!req.body.email) return res.status(400).json({ message: "Email is required!" });
    if (!req.body.password) return res.status(400).json({ message: "Password is required!" });

    return next();
};

export const validateRegisterBody = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return res.status(400).json({ message: "Required data is missing" });
    if (!req.body.email) return res.status(400).json({ message: "Email is required!" });
    if (!req.body.password) return res.status(400).json({ message: "Password is required!" });
    if (!req.body.firstName) return res.status(400).json({ message: "First name is required!" });
    if (!req.body.lastName) return res.status(400).json({ message: "Last name is required!" });

    return next();
};
