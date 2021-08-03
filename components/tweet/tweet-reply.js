import Image from "next/image";
import { useRef, useState } from "react";
import styles from "../../styles/test.module.scss";

export default function TweetReply() {
  const [content, setContent] = useState("");
  const textRef2 = useRef();
  const classes = "block border-twblue";

  return (
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
          placeholder="Tweet your reply"
          className="w-full border-none max-h-90vh resize-none focus:outline-none"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onFocus={() => {
            textRef2.current.classList.remove("hidden");
            textRef2.current.classList.add(...classes.split(" "));
            // textRef2.current.classList.add(styles.test);
          }}
          onBlur={() => {
            textRef2.current.classList.remove(...classes.split(" "));
            // textRef.current.classList.remove(styles.test);
          }}
        ></textarea>
        <hr
          className={`hidden border-b-2 relative ${styles.test}`}
          ref={textRef2}
        />
        <button
          onClick={() => console.log(1)}
          disabled={content.length > 0 ? false : true}
          className="block transition bg-twblue p-2 px-4 rounded-full text-white font-bold ml-auto mt-2 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none"
        >
          Reply
        </button>
      </div>
    </div>
  );
}
