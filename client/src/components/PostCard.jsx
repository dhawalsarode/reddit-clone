import { Link } from "react-router-dom";

function PostCard({ post }) {

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">

      <div className="text-sm text-zinc-400 mb-2">
        Posted by u/{post.author.username}
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

      <Link to={`/post/${post.id}`}>
        <h2 className="text-xl font-semibold mb-3 hover:text-orange-400 transition">
          {post.title}
        </h2>
      </Link>

      <p className="text-zinc-300 mb-4">
        {post.content}
      </p>

      <div className="flex gap-6 text-sm text-zinc-400">

        <span>
          ▲ {post._count.votes}
        </span>

        <span>
          💬 {post._count.comments} Comments
        </span>

      </div>
    </div>
  );
}

export default PostCard;