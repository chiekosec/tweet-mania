import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import session from "../../middlewares/session";
import PostSchema from "../../schemas/PostSchema";
import UserSchema from "../../schemas/UserSchema";

const handler = nextConnect();
handler.use(middleware);
handler.use(session);

handler.post(async (req, res) => {
  console.log("IN POST APi");
  const user = req.session.get("userrr");
  let { content } = req.body;
  content = content.trim();
  console.log(content);

  if (content) {
    PostSchema.create({
      content: content,
      postedBy: user,
    })
      .then(async (data) => {
        data = await UserSchema.populate(data, { path: "postedBy" });
        return res.status(201).json({ msg: data });
      })
      .catch((e) => console.log(e));
  } else {
    res.status(200).json({ error: "Invalid data" });
  }
});

export default handler;
