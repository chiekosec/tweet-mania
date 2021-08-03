import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import axios from "axios";
import ErrorBadge from "../components/error-badge/error-badge-component";
import { useRouter } from "next/dist/client/router";
import Layout from "../components/layout/layout-component";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();
  const passref = useRef();
  const cpassref = useRef();
  const { fname, lname, username, email, password, cpassword } = userInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passref.current.value !== cpassref.current.value) {
      alert("Password fields does not match");
      return;
    }
    // console.log(userInfo);
    axios.post("/api/register", userInfo).then((res) => {
      if (res.data.redir) {
        router.replace("/");
      } else {
        if (res.data.error) {
          setError(data.error);
        } else {
          setError(res.data.msg);
        }
      }
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <Layout>
      <div className="bg-white w-9/12 max-w-md my-auto p-10 pb-16 rounded-md shadow-xl mt-10 mb-10 text-gray-700">
        <div className="flex flex-col items-center">
          <Image
            src="/twitter.svg"
            width="50"
            height="50"
            className="animate-pulse"
            alt="twitter logo"
          />
          <form className="w-10/12" method="post" onSubmit={handleSubmit}>
            <div className="mt-8">
              <label>
                First Name
                <input
                  required
                  type="text"
                  name="fname"
                  id="fname"
                  value={fname}
                  onChange={handleChange}
                  className="border-2 rounded-sm p-1 focus:border-twblue focus:outline-none block mt-0.5 w-full"
                />
              </label>
            </div>
            <div className="mt-1">
              <label>
                Last Name
                <input
                  required
                  type="text"
                  name="lname"
                  id="lname"
                  value={lname}
                  onChange={handleChange}
                  className="border-2 rounded-sm p-1 focus:border-twblue focus:outline-none block mt-0.5 w-full"
                />
              </label>
            </div>
            <div className="mt-1">
              <label>
                Username
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleChange}
                  className="border-2 rounded-sm p-1 focus:border-twblue focus:outline-none block mt-0.5 w-full"
                />
              </label>
            </div>
            <div className="mt-1">
              <label>
                e-mail
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className="border-2 rounded-sm p-1 focus:border-twblue focus:outline-none block mt-0.5 w-full"
                />
              </label>
            </div>
            <div className="mt-1">
              <label>
                Password
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  className="border-2 rounded-sm p-1 focus:border-twblue focus:outline-none block w-full"
                  ref={passref}
                />
              </label>
            </div>
            <div className="mt-1">
              <label>
                Confirm Password
                <input
                  required
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  value={cpassword}
                  onChange={handleChange}
                  className="border-2 rounded-sm p-1 focus:border-twblue focus:outline-none block mt-0.5 w-full"
                  ref={cpassref}
                />
              </label>
            </div>
            {error && <ErrorBadge msg={error} />}
            <button
              type="submit"
              className="mt-4 w-full rounded-sm bg-twblue hover:bg-blue-300 text-white py-1 transition"
            >
              Register
            </button>
          </form>
          <Link href="/">
            <a className="text-twblue mt-2">
              Already have an account? Login here.
            </a>
          </Link>
        </div>
      </div>
      <footer className="mt-auto w-full bg-gray-50 text-black text-center p-5">
        @copyright Twitter
      </footer>
    </Layout>
  );
}
