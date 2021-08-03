import nc from "next-connect";
import middleware from "../../middlewares/middleware";
import User from "../../schemas/UserSchema";
import bcrypt from "bcrypt";
import session from "../../middlewares/session";

const handler = nc({ onNoMatch });

function onNoMatch(req, res) {
  res.status(404).json({ msg: "method not allowed" });
}

handler.use(middleware);
handler.use(session);

handler.post(async (req, res) => {
  let payload;
  let user;
  let { fname, lname, username, email, password, cpassword } = req.body;
  fname = fname.trim();
  lname = lname.trim();
  username = username.trim();
  email = email.trim();
  if (fname && lname && username && email && password && cpassword) {
    try {
      user = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });
    } catch (error) {
      console.log("Error in query", error);
    }

    if (user == null) {
      //insert user in db
      password = await bcrypt.hash(password, 5);

      const dbUser = await User.create({
        firstName: fname,
        lastName: lname,
        username: username,
        email: email,
        password: password,
        likes: [],
      });
      await req.session.set("userrr", dbUser);
      await req.session.save();
      return res.status(200).json({ redir: "/" });
    } else {
      //user found
      if (user.email == email) {
        payload = "Email already registered";
      } else {
        payload = "username already exists";
      }
    }

    res.status(200).json({ msg: payload });
  } else {
    res.status(200).json({ error: "Please enter correct details" });
  }
});

export default handler;
