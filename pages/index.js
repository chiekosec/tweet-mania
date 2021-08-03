import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import axios from "axios";
import ErrorBadge from "../components/error-badge/error-badge-component";
import { useRouter } from "next/dist/client/router";
import Layout from "../components/layout/layout-component";

export default function Home() {
  const [error, setError] = useState("");
  const router = useRouter();
  const user = useRef();
  const pass = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/login", {
        user: user.current.value,
        pass: pass.current.value,
      })
      .then((res) => {
        if (res.data.redir) {
          router.replace("/home");
        } else {
          if (res.data.err) {
            setError(res.data.err);
          } else {
            setError(res.data.msg);
          }
        }
      });
  };

  return (
    <Layout>
      <div className="bg-white w-9/12 max-w-md my-auto p-10 pb-16 rounded-md shadow-xl text-gray-700 mb-10">
        <div className="flex flex-col items-center">
          <Image
            src="/twitter.svg"
            width="50"
            height="50"
            className="animate-pulse"
            alt="twitter logo"
          />
          <form className="w-10/12" onSubmit={handleSubmit}>
            <div className="mt-8">
              <label>
                Username or e-mail
                <input
                  type="text"
                  name="email"
                  id="email"
                  required
                  className="border-2 rounded-sm p-1 focus:border-twblue focus:outline-none block mt-0.5 w-full"
                  ref={user}
                />
              </label>
            </div>
            <div className="mt-4">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  required
                  id="password"
                  className="border-2 rounded-sm p-1 focus:border-twblue focus:outline-none block mt-0.5 w-full"
                  ref={pass}
                />
              </label>
            </div>
            {error && <ErrorBadge msg={error} />}
            <button
              type="submit"
              className="mt-4 w-full rounded-sm bg-twblue hover:bg-blue-300 text-white py-1 transition"
            >
              login
            </button>
          </form>
          <Link href="/register">
            <a className="text-twblue mt-2">Need an account? Register here.</a>
          </Link>
        </div>
      </div>
      <footer className="mt-auto w-full bg-gray-50 text-black text-center p-5">
        @copyright Twitter
      </footer>
    </Layout>
  );
}
