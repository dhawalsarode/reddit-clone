import {
  useContext,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

function Navbar() {

  const {
    user,
    logout,
  } = useContext(AuthContext);

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-3xl font-bold text-orange-500"
        >
          RedditClone
        </Link>

        <div className="flex items-center gap-6 text-white">

          <Link
            to="/"
            className="hover:text-orange-400 transition"
          >
            Home
          </Link>

          {
            user ? (
              <>
                <span className="text-zinc-400">
                  u/{user.username}
                </span>

                <Link
                  to="/create-post"
                  className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg"
                >
                  Create Post
                </Link>

                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-orange-400 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="hover:text-orange-400 transition"
                >
                  Signup
                </Link>
              </>
            )
          }

        </div>

      </div>

    </nav>
  );
}

export default Navbar;