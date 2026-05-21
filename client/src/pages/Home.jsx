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

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const response =
          await getAllPosts();

        setPosts(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchPosts();

  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div>Loading posts...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Home Feed
      </h1>

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