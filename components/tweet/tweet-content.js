import styles from "../../styles/test.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function TweetContent({
  id,
  content,
  firstName,
  lastName,
  username,
  profilePic,
  timestamp,
  like,
  likess,
  retweet,
  retweetss,
  handleFooterClick,
}) {
  return (
    <div className="flex flex-wrap p-2 px-4 border-b-1 border-twgray-lt">
      <div className="w-12">
        <Link passHref href={""}>
          <a>
            <Image
              src={profilePic}
              alt="User profile"
              className="w-full rounded-full cursor-pointer"
              width="100%"
              height="87%"
            />
          </a>
        </Link>
      </div>
      <div className="flex-1 pl-3">
        <div className="flex flex-col">
          <div className="headr">
            <Link href={""}>
              <span className="font-semibold">
                {firstName + " " + lastName}
              </span>
            </Link>
            <span className="text-gray-600">{" @" + username}</span>
            <span className="text-gray-600">{" . " + timestamp}</span>
          </div>
          <div className="mainsec word-wrap whitespace-pre-wrap">{content}</div>
          <div className="flex mt-3 items-center relative">
            <div className="flex-1 relative h-8">
              <button
                name="comment"
                className="w-8 text-twgray-lt transition-all hover:bg-twblue hover:bg-opacity-10 hover:text-blue-500 rounded-full absolute top-0 -left-2 right-0 bottom-0 flex justify-center items-center cursor-pointer"
                onClick={handleFooterClick}
              >
                <i
                  className={
                    "fal fa-comment block text-base pointer-events-none"
                  }
                />
              </button>
            </div>
            <div className="flex-1 relative h-8">
              <button
                name="retweet"
                className="w-8 text-twgray-lt transition-all hover:bg-green-400 hover:bg-opacity-10 hover:text-green-600 rounded-full absolute top-0 -left-2 right-0 bottom-0 flex justify-center items-center cursor-pointer"
                onClick={handleFooterClick}
              >
                <i
                  className={`${
                    styles.anim
                  } fal fa-retweet block text-base pointer-events-none ${
                    retweet && "font-bold text-green-500"
                  }`}
                />
                <span
                  className={`absolute -right-2 ${
                    retweet ? "text-green-500" : ""
                  }`}
                >
                  {retweetss > 0 ? retweetss : ""}
                </span>
              </button>
            </div>
            <div className="flex-1 relative h-8">
              <button
                name="like"
                className={`w-8 text-twgray-lt transition-all hover:bg-red-400 hover:bg-opacity-20 hover:text-red-500 rounded-full absolute top-0 -left-2 right-0 bottom-0 flex justify-center items-center cursor-pointer`}
                onClick={handleFooterClick}
              >
                <i
                  className={`${
                    styles.anim
                  } z-10 fal fa-heart block text-base pointer-events-none ${
                    like ? "fas text-red-500" : ""
                  }`}
                />
                <span
                  className={`absolute -right-2 ${like ? "text-red-500" : ""}`}
                >
                  {likess > 0 ? likess : ""}
                </span>
              </button>
              <div
                className={`absolute w-8 bottom-0 ${like && styles.heart} ${
                  like && styles.isActive
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
