import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Community from "./pages/Community";
import CreatePost from "./pages/CreatePost";  
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/r/:communityName" element={<Community />} />
            <Route path="/create-post" element={<CreatePost />}/>
            <Route path="/post/:id" element={<SinglePost />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;