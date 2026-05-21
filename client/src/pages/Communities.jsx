import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getAllCommunities,
} from "../api/communityApi";

function Communities() {

  const [communities, setCommunities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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

      } finally {

        setLoading(false);
      }
    };

    fetchCommunities();

  }, []);

  if (loading) {

    return (
      <MainLayout>
        <div>
          Loading communities...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-4xl font-bold">
            Communities
          </h1>

          <Link
            to="/create-community"
            className="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-xl"
          >
            Create Community
          </Link>

        </div>

        <div className="space-y-4">

          {
            communities.map(
              (community) => (

              <Link
                key={community.id}
                to={`/r/${community.name}`}
                className="block bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500 transition"
              >

                <h2 className="text-2xl font-semibold mb-2 text-orange-400">
                  r/{community.name}
                </h2>

                <p className="text-zinc-400">
                  {
                    community.description
                  }
                </p>

              </Link>
            ))
          }

        </div>

      </div>

    </MainLayout>
  );
}

export default Communities;