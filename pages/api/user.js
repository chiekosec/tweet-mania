import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import session from "../../middlewares/session";

const handler = nextConnect();
handler.use(middleware);
handler.use(session);

handler.post((req, res) => {
  const user = req.session.get("userrr");
  if (!user) {
    return res.status(200).json({ redir: "/" });
  }
  res.status(200).json({ user: user });
});

export default handler;
