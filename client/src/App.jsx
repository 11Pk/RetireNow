import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Story from "./components/Story";
import Health from "./components/Health";
// import Community from "./components/Community";
// import Home from "./components/Home";
import LandingPage from './sections/LandingPage'
import Posts from './sections/posts.jsx'
function App() {
  return (
    <Router>
      
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/story" element={<Story />} />
        <Route path="/health" element={<Health />} />
        {/* <Route path="/community" element={<Community />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
