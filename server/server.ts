import { startServer } from "./src/app";

startServer().catch(err => {
  console.error("Critical failure during server startup:", err);
  process.exit(1);
});
