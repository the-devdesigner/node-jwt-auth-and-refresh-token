import { sign } from "jsonwebtoken";
import { Types } from "mongoose";

export const createAuthToken = (userId: Types.ObjectId) => {
    try {
        return sign({ _id: userId }, process.env.AUTH_TOKEN_SECRET as string, {
            noTimestamp: false,
            algorithm: "HS512",
            expiresIn: "10s",
        });
    } catch (error) {
        console.log(`Auth token generation error: ${error}`);
        return (error as Error).message;
    }
};

export const createRefreshToken = (userId: Types.ObjectId) => {
    try {
        return sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET as string, {
            noTimestamp: false,
            algorithm: "HS512",
            expiresIn: "7d",
        });
    } catch (error) {
        console.log(`Refresh token generation error: ${error}`);
        return (error as Error).message;
    }
};
