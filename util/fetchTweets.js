import axios from "axios";

export default function fetchTweets() {
  return axios.get("/api/tweets").then(({ data }) => data.msg);
}
