import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import HomeComponent from "../components/home/home-component";
import Loading from "../components/loading/loading-component";
import Main from "../components/main/main-component";
import BottomNav from "../components/nav/bottom-nav/bottom-nav-component";
import NavItem from "../components/nav/nav-item/nav-item-component";
import SideNav from "../components/nav/side-nav/side-nav-component";
import Tweet from "../components/tweet/tweet";
import fetchTweets from "../util/fetchTweets";

export default function HomePage() {
  const router = useRouter();
  const [dataa, setDataa] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.post("/api/user").then(async (d) => {
      if (d.data.redir) {
        router.replace("/");
      } else {
        const tweetData = await fetchTweets();
        setDataa(tweetData);
        setLoading(false);
      }
    });
  }, [router]);

  return (
    <HomeComponent>
      <SideNav>
        <NavItem path="/home" icon="fad fa-dove" logo />
        <NavItem path="/home" icon="fal fa-house" content="Home" />
        <NavItem path="/home" icon="far fa-search" content="Explore" />
        <NavItem path="/home" icon="fal fa-bell" content="Notifications" />
        <NavItem path="/home" icon="fal fa-envelope" content="Messages" />
        <NavItem path="/home" icon="fal fa-user-alt" content="Profile" />
      </SideNav>
      <Main>
        {loading && <Loading />}
        {dataa
          ? dataa.map((tweet) => (
              <Tweet
                key={tweet._id}
                id={tweet._id}
                content={tweet.content}
                firstName={tweet.postedBy.firstName}
                lastName={tweet.postedBy.lastName}
                username={tweet.postedBy.username}
                createdAt={tweet.createdAt}
                profilePic={tweet.postedBy.profilePic}
                likes={tweet.likes ? tweet.likes.length : 0}
                userLiked={tweet.userLiked}
                userRetweeted={tweet.userRetweeted}
                retweets={tweet.retweets ? tweet.retweets.length : 0}
              />
            ))
          : ""}
      </Main>
      {/* <div>User: {dataa?.data?.user ? dataa.data.user.firstName : ""}</div> */}
      {/* <div className="hidden md:block md:col-start-9 md:col-span-4 xl:col-start-10"></div> */}
      <BottomNav>
        <NavItem path="/home" icon="fal fa-house" content="Home" />
        <NavItem path="/home" icon="far fa-search" content="Explore" />
        <NavItem path="/home" icon="fal fa-bell" content="Notifications" />
        <NavItem path="/home" icon="fal fa-envelope" content="Messages" />
      </BottomNav>
    </HomeComponent>
  );
}
