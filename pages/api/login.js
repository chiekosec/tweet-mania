import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import session from "../../middlewares/session";
import UserSchema from "../../schemas/UserSchema";
import bcrypt from "bcrypt";

const handler = nextConnect();
handler.use(middleware);
handler.use(session);

handler.post(async (req, res) => {
  console.log("IN LOGIN APi");
  let dbUser;
  let { user, pass } = req.body;
  console.log("usr", user, "pas", pass);
  user = user.trim();

  if (user && pass) {
    try {
      dbUser = await UserSchema.findOne({
        $or: [{ username: user }, { email: user }],
      });
    } catch (error) {
      console.log("Error in query", error);
    }

    if (dbUser != null) {
      let check = await bcrypt.compare(pass, dbUser.password);

      if (check) {
        await req.session.set("userrr", dbUser);
        await req.session.save();
        return res.status(200).json({ redir: "/home" });
      }
      return res.status(200).json({ err: "Invalid credentials" });
    }
    return res.status(200).json({ err: "User doesn't exist" });
  } else {
    res.status(200).json({ error: "Please enter correct details" });
  }
});

export default handler;
