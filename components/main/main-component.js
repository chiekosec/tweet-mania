import axios from "axios";
import { useRef, useState } from "react";
import styles from "../../styles/test.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Main({ children }) {
  const router = useRouter();
  const textRef = useRef();
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/post", { content }).then((d) => {
      router.replace("/home");
      setContent("");
    });
  };
  // const classes =
  //   "before:transition-all before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:w-full before:z-10 before:h-2 before:bg-twblue";
  // const classes = "after:scale-x-100";
  const classes = "block border-twblue";
  return (
    <div className="sm:relative sm:col-start-3 sm:col-span-full md:col-start-3 md:col-span-6 xl:col-start-4 border-r-2 border-twgray-lt">
      <div className="sticky top-1 z-10 bg-white p-2 px-4 text-xl font-black w-full border-b-2">
        Home
      </div>
      <div
        className={`overflow-y-scroll mt-1 h-screen no-scrollbar text-sm ${styles.scroll}`}
      >
        <div className="flex p-2 px-4">
          <div className="w-12">
            <Image
              src="/defaultProfile.png"
              alt="User profile"
              className="w-full rounded-full"
              width="100%"
              height="87%"
            />
          </div>
          <div className="pl-3 flex-1">
            <textarea
              name="tweetText"
              placeholder="What's happening?"
              className="w-full max-h-96 border-none resize-none focus:outline-none"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onFocus={() => {
                textRef.current.classList.remove("hidden");
                textRef.current.classList.add(...classes.split(" "));
                // textRef.current.classList.add(styles.test);
              }}
              onBlur={() => {
                textRef.current.classList.remove(...classes.split(" "));
                // textRef.current.classList.remove(styles.test);
              }}
            ></textarea>
            <hr
              className={`hidden border-b-2 relative ${styles.test}`}
              ref={textRef}
            />
            <button
              onClick={handleSubmit}
              disabled={content.length > 0 ? false : true}
              className="block transition bg-twblue p-2 px-4 rounded-full text-white font-bold ml-auto mt-2 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none"
            >
              Tweet
            </button>
          </div>
        </div>
        <hr className="h-2 bg-twgray-xlt border-t-1 border-b-1 border-twgray-lt" />
        {/* {user?.length
          ? user
              .slice(0)
              .reverse()
              .map((user) =>
                user?.msg ? (
                  <Tweet
                    key={user.msg._id}
                    id={user.msg._id}
                    content={user.msg.content}
                    firstName={user.msg.postedBy.firstName}
                    lastName={user.msg.postedBy.lastName}
                    username={user.msg.postedBy.username}
                    createdAt={user.msg.createdAt}
                    profilePic={user.msg.postedBy.profilePic}
                    likes={user.msg.likes ? user.msg.likes.length : 0}
                    userLiked={user.msg.userLiked}
                    userRetweeted={user.msg.userRetweeted}
                    retweets={user.msg.retweets ? user.msg.retweets.length : 0}
                  />
                ) : (
                  ""
                )
              )
          : ""} */}
        {children}
      </div>
    </div>
  );
}
