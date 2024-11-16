import { SequelizeStorage, Umzug } from "umzug";
import { sequelize } from ".";

const umzug = new Umzug({
  migrations: {
    glob: "migrations/*.ts",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

export const runMigrations = async () => {
  await sequelize.authenticate();
  await umzug.up();
};

export const rollbackMigration = async () => {
  await sequelize.authenticate();
  await umzug.down();
};
