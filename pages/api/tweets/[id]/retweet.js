import nextConnect from "next-connect";
import middleware from "../../../../middlewares/middleware";
import session from "../../../../middlewares/session";
import PostSchema from "../../../../schemas/PostSchema";
import UserSchema from "../../../../schemas/UserSchema";

const handler = nextConnect();
handler.use(middleware);
handler.use(session);

handler.post(async (req, res) => {
  console.log("IN RETweet APi");
  const user = req.session.get("userrr");

  if (user) {
    let dbUser = await UserSchema.findById(user._id);
    let tweetId = req.query.id;
    let isRetweeted = dbUser.retweets && dbUser.retweets.includes(tweetId);

    if (isRetweeted) {
      await UserSchema.findByIdAndUpdate(
        user._id,
        {
          $pull: { retweets: tweetId },
        },
        { new: true }
      );

      await PostSchema.findByIdAndUpdate(
        tweetId,
        {
          $pull: { retweets: user._id },
        },
        { new: true }
      );
    } else {
      await UserSchema.findByIdAndUpdate(
        user._id,
        {
          $addToSet: { retweets: tweetId },
        },
        { new: true }
      );

      await PostSchema.findByIdAndUpdate(
        tweetId,
        {
          $addToSet: { retweets: user._id },
        },
        { new: true }
      );
    }
    res.status(200).json({ msg: "retweeted" });
  } else {
    res.status(200).json({ error: "Invalid data" });
  }
});

export default handler;
