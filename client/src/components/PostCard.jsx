import { Link } from "react-router-dom";

import { votePost } from "../api/voteApi";

function PostCard({
  post,
}) {

  const handleVote = async (
    value
  ) => {

    try {

      await votePost(
        post.id,
        value
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Voting failed");
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">

      <div className="text-sm text-zinc-400 mb-2">

        Posted by
        {" "}
        u/{post.author.username}
        {" "}
        in
        {" "}

        <Link
          to={`/r/${post.community.name}`}
          className="text-orange-400"
        >
          r/{post.community.name}
        </Link>

      </div>

      <Link
        to={`/post/${post.id}`}
      >
        <h2 className="text-xl font-semibold mb-3 hover:text-orange-400 transition">

          {post.title}

        </h2>
      </Link>

      <p className="text-zinc-300 mb-4">
        {post.content}
      </p>

      <div className="flex gap-6 text-sm text-zinc-400 items-center">

        <button
          onClick={() =>
            handleVote(1)
          }
          className="hover:text-green-400 transition"
        >
          ▲
        </button>

        <span>
          {post.voteScore || 0}
        </span>

        <button
          onClick={() =>
            handleVote(-1)
          }
          className="hover:text-red-400 transition"
        >
          ▼
        </button>

        <span>
          💬
          {" "}
          {post._count.comments}
          {" "}
          Comments
        </span>

      </div>
    </div>
  );
}

export default PostCard;