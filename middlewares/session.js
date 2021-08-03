import { ironSession } from "next-iron-session";
const session = ironSession({
  cookieName: "lakshit",
  password: process.env.SECRET_COOKIE_PASSWORD,
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

export default session;
