import cors, { CorsOptions } from "cors";

export const config: CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
