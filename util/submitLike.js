import axios from "axios";

export default function submitLike(tweetId) {
  axios.put(`/api/tweets/${tweetId}/like`).then((d) => console.log("done"));
}
