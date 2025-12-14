import app from "./server.js";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
