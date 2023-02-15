import { config as setupConfig } from "dotenv";

setupConfig();

const config = Object.freeze({
  JWT_SECRET: process.env.JWT_SECRET,
});

export default config;
