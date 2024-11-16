import { Sequelize } from "sequelize";
import { config } from "@/config";

export const sequelize = new Sequelize(config.databaseUrl, {
  dialect: "postgres",
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};
