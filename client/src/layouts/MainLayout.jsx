import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getAllCommunities,
} from "../api/communityApi";

function MainLayout({ children }) {

  const [communities, setCommunities] =
    useState([]);

  useEffect(() => {

    const fetchCommunities =
      async () => {

      try {

        const response =
          await getAllCommunities();

        setCommunities(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

    fetchCommunities();

  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">

        {/* Sidebar */}
        <aside className="w-64 hidden md:block">

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sticky top-6">

            <h2 className="text-xl font-bold mb-4">
              Communities
            </h2>

            <div className="space-y-3 text-zinc-300">

              {
                communities.map(
                  (community) => (

                  <Link
                    key={community.id}
                    to={`/r/${community.name}`}
                    className="block hover:text-orange-400 transition"
                  >
                    r/{community.name}
                  </Link>
                ))
              }

            </div>

          </div>

        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;