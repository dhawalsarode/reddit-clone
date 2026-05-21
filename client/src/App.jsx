import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Community from "./pages/Community";
import CreatePost from "./pages/CreatePost";  
import SinglePost from "./pages/SinglePost";
import Communities from "./pages/Communities";
import CreateCommunity from "./pages/CreateCommunity";

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
            <Route path="/communities" element={<Communities />}/>
            <Route path="/create-community" element={<CreateCommunity />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;