#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { runMigrations, rollbackMigration } from "@/database/migrator";

yargs(hideBin(process.argv))
  .command(
    "migrate <command>",
    "Run or revert database migrations",
    (yargs) => {
      return yargs.positional("command", {
        describe: "Command to execute",
        choices: ["up", "down"],
        type: "string",
      });
    },
    async (argv) => {
      switch (argv.command) {
        case "up":
          await runMigrations();
          console.log("Migrations ran successfully");
          break;
        case "down":
          await rollbackMigration();
          console.log("Migration rolled back successfully");
          break;
        default:
          console.log("Invalid command:", argv.command);
          break;
      }
    },
  )
  .demandCommand()
  .help()
  .parse();
