import nc from "next-connect";
import connectDb from "../util/db";

const middleware = nc();

middleware.use(async (req, res, next) => {
  await connectDb();
  next();
});

export default middleware;
