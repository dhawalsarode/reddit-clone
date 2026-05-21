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
          className="text-orange-400 hover:text-orange-300 transition"
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

      <p className="text-zinc-300 mb-5">
        {post.content}
      </p>
{
      post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="rounded-xl mb-5 max-h-[500px] w-full object-cover"
        />
      )
    }

    {
      post.videoUrl && (
        <video
          controls
          className="rounded-xl mb-5 w-full"
        >
          <source
            src={post.videoUrl}
            type="video/mp4"
          />
        </video>
      )
    }

      <div className="flex items-center gap-4 flex-wrap">

        <button
          onClick={() =>
            handleVote(1)
          }
          className="flex items-center justify-center bg-zinc-800 hover:bg-green-600 transition px-4 py-2 rounded-lg text-white"
        >
          ▲
        </button>

        <span className="text-lg font-semibold min-w-[20px] text-center">
          {post.voteScore || 0}
        </span>

        <button
          onClick={() =>
            handleVote(-1)
          }
          className="flex items-center justify-center bg-zinc-800 hover:bg-red-600 transition px-4 py-2 rounded-lg text-white"
        >
          ▼
        </button>

        <Link
          to={`/post/${post.id}`}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition px-4 py-2 rounded-lg text-white"
        >
          <span>💬</span>

          <span>
            {post._count.comments}
            {" "}
            Comments
          </span>
        </Link>

      </div>

    </div>
  );
}

export default PostCard;