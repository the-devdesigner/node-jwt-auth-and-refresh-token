import nodeExternals from "webpack-node-externals";
import path from "path";

const VENDORS = ["dotenv", "express", "regenerator-runtime", "jsonwebtoken", "bcrypt"];
module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.ts",
        vendor: VENDORS,
    },
    output: {
        filename: "[name]-[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    target: "node",
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
};