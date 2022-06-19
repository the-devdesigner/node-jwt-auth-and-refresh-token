import { connect } from "mongoose";

export const connectToDb = () => {
    try {
        connect(process.env.URI as string, () => console.info(`MongoDB Atlast connected!`));
    } catch (error) {
        console.error(`DB Connection failed: ${error}`);
    }
};
