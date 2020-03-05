'use strict';

const Server = require('./server');
const Configs = require('./configuration');

console.log(`Running environment ${process.env.NODE_ENV || "dev"}`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason) => {
  console.error(`unhandledRejection ${reason}`);
});

// Define async start function
const start = async () => {
  try {
    const serverConfigs = Configs.getServerConfigs();
    await Server.start(serverConfigs);
  } catch (err) {
    console.error("Error starting server: ", err.message);
    throw err;
  }
};

// Start the server
start();