require("dotenv/config");
require("regenerator-runtime");

import app from "./utils/app";
import { connectToDb } from "./utils/db";

const PORT: string | number = process.env.PORT || 4000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectToDb();

export default server;
