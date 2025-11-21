import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MicroJobs from "./components/Microjobs";
import Story from "./components/Story";
import Posts from "./components/posts";

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");  
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/login" 
        element={
          <Login 
          />
        } 
      />
      {/* <Route path="/microjobs" element={<MicroJobs />} /> */}
      <Route path="/story" element={<Story />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}

export default App;
