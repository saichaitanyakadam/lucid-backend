import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import dnsRouter from "./routes/dns.route.js";
import domainRouter from "./routes/domain.route.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/dns", dnsRouter);
app.use("/api/domain", domainRouter);

export { app };
