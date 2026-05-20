import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          className="text-2xl font-bold text-orange-500"
        >
          RedditClone
        </Link>

        <div className="flex gap-6 text-zinc-300">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;