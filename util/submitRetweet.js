import axios from "axios";

export default function submitRetweet(tweetId) {
  axios
    .post(`/api/tweets/${tweetId}/retweet`)
    .then((d) => console.log("RT done"));
}
