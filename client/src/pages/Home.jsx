import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import PostCard from "../components/PostCard";

import {
  getAllPosts,
} from "../api/postApi";

function Home() {

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [sort, setSort] =
    useState("latest");

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const response =
          await getAllPosts(sort);

        setPosts(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchPosts();

  }, [sort]);

  if (loading) {
    return (
      <MainLayout>
        <div>Loading posts...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="flex items-center justify-between mb-6">

      <h1 className="text-3xl font-bold">
        Home Feed
      </h1>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg"
      >

        <option value="latest">
          Latest
        </option>

        <option value="top">
          Top
        </option>

      </select>

    </div>

      {
        posts.length === 0
          ? (
            <div>No posts yet</div>
          )
          : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          )
      }

    </MainLayout>
  );
}

export default Home;