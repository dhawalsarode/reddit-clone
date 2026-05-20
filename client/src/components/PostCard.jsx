function PostCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
      
      <div className="text-sm text-zinc-400 mb-2">
        Posted in r/reactjs
      </div>

      <h2 className="text-xl font-semibold mb-3">
        Building a Reddit Clone with React
      </h2>

      <p className="text-zinc-300 mb-4">
        This is a sample post card UI for our Reddit clone project.
      </p>

      <div className="flex gap-6 text-sm text-zinc-400">
        <span>▲ 124</span>
        <span>💬 32 Comments</span>
      </div>
    </div>
  );
}

export default PostCard;