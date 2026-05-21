import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getSinglePost,
} from "../api/postApi";

import {
  createComment,
  getCommentsByPost,
} from "../api/commentApi";

import {
  AuthContext,
} from "../context/AuthContext";

function SinglePost() {

  const { id } = useParams();

  const { user } =
    useContext(AuthContext);

  const [post, setPost] =
    useState(null);

  const [comments, setComments] =
    useState([]);

  const [content, setContent] =
    useState("");

  useEffect(() => {

    fetchPost();

    fetchComments();

  }, []);

  const fetchPost = async () => {

    try {

      const response =
        await getSinglePost(id);

      setPost(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchComments =
    async () => {

    try {

      const response =
        await getCommentsByPost(id);

      setComments(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleComment =
    async (e) => {

    e.preventDefault();

    try {

      await createComment({
        content,
        postId: id,
      });

      setContent("");

      fetchComments();

    } catch (error) {

      console.log(error);

      alert("Failed to add comment");
    }
  };

  if (!post) {
    return (
      <MainLayout>
        <p className="text-white">
          Loading...
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

          <p className="text-zinc-400 mb-2">
            Posted by u/
            {post.author.username}
          </p>

          <h1 className="text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <p className="text-zinc-300">
            {post.content}
          </p>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold text-white mb-6">
            Comments
          </h2>

          {
            user && (
              <form
                onSubmit={handleComment}
                className="mb-8"
              >

                <textarea
                  value={content}
                  onChange={(e) =>
                    setContent(
                      e.target.value
                    )
                  }
                  placeholder="Write a comment..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-white outline-none"
                  rows="4"
                  required
                />

                <button
                  type="submit"
                  className="mt-4 bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl text-white font-semibold"
                >
                  Add Comment
                </button>

              </form>
            )
          }

          <div className="space-y-4">

            {
              comments.map((comment) => (

                <div
                  key={comment.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                >

                  <p className="text-orange-400 mb-2">
                    u/{comment.author.username}
                  </p>

                  <p className="text-zinc-300">
                    {comment.content}
                  </p>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default SinglePost;