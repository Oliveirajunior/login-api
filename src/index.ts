import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {itemsRouter} from "./users/users.router";
import { loginRouter } from "./login/login.router";
import { errorHandler } from "./middleware/error.middlaware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

if(!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/users', itemsRouter);
app.use('/login', loginRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => console.log(`listen on port ${PORT}`));