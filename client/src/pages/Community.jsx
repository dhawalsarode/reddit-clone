import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import PostCard from "../components/PostCard";

import {
  getPostsByCommunity,
} from "../api/postApi";

function Community() {

  const { communityName } =
    useParams();

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchCommunityPosts =
      async () => {

        try {

          const response =
            await getPostsByCommunity(
              communityName
            );

          setPosts(response.data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchCommunityPosts();

  }, [communityName]);

  if (loading) {
    return (
      <MainLayout>
        <div>Loading community...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        r/{communityName}
      </h1>

      {
        posts.length === 0
          ? (
            <div>No posts in this community</div>
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

export default Community;