import nextConnect from "next-connect";
import middleware from "../../../middlewares/middleware";
import session from "../../../middlewares/session";
import PostSchema from "../../../schemas/PostSchema";
import UserSchema from "../../../schemas/UserSchema";

const handler = nextConnect();
handler.use(middleware);
handler.use(session);

handler.get(async (req, res) => {
  console.log("IN Tweets APi");
  const user = req.session.get("userrr");
  const dbUser = await UserSchema.findById(user._id);

  if (user) {
    PostSchema.find()
      .sort("-createdAt")
      .populate({ path: "postedBy" })
      .then((result) => {
        const refinedResults = result.map((tweet) => {
          return {
            ...tweet._doc,
            userLiked: dbUser.likes.includes(tweet._id),
            userRetweeted: dbUser.retweets.includes(tweet._id),
          };
        });
        // console.log("Refnd", refinedResults);
        // console.log("======================\nRes", result);
        res.status(200).json({ msg: refinedResults });
      })
      .catch((e) => console.log(e));
  } else {
    res.status(200).json({ error: "Invalid data" });
  }
});

export default handler;
