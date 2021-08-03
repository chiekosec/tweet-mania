import nextConnect from "next-connect";
import middleware from "../../../../middlewares/middleware";
import session from "../../../../middlewares/session";
import PostSchema from "../../../../schemas/PostSchema";
import UserSchema from "../../../../schemas/UserSchema";

const handler = nextConnect();
handler.use(middleware);
handler.use(session);

handler.put(async (req, res) => {
  console.log("IN Like APi");
  const user = req.session.get("userrr");

  if (user) {
    let dbUser = await UserSchema.findById(user._id);
    let tweetId = req.query.id;
    let isLiked = dbUser.likes && dbUser.likes.includes(tweetId);

    if (isLiked) {
      await UserSchema.findByIdAndUpdate(
        user._id,
        {
          $pull: { likes: tweetId },
        },
        { new: true }
      );

      await PostSchema.findByIdAndUpdate(
        tweetId,
        {
          $pull: { likes: user._id },
        },
        { new: true }
      );
    } else {
      await UserSchema.findByIdAndUpdate(
        user._id,
        {
          $addToSet: { likes: tweetId },
        },
        { new: true }
      );

      await PostSchema.findByIdAndUpdate(
        tweetId,
        {
          $addToSet: { likes: user._id },
        },
        { new: true }
      );
    }
    res.status(200).json({ msg: "tweet liked" });
  } else {
    res.status(200).json({ error: "Invalid data" });
  }
});

export default handler;
