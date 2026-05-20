import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
}

export default Navbar;