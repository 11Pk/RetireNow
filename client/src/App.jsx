import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Story from "./components/Story";
import Posts from "./components/posts";
import MicroJobs from "./components/Microjobs";
import Health from "./components/Health";
import ProviderJobForm from "./components/ProviderJobForm";
import MyJobs from "./components/MyJobs";
import ProtectedRoute from "./components/ProtectedRoute";

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
      <Route path="/story" element={<Story />} />
      <Route path="/community" element={<Posts />} />
      <Route path="/microjobs" element={<MicroJobs/>} />
      <Route path="/health" element={<Health/>} />
  <Route path="/provider-dashboard" element={<ProviderJobForm />} />
      <Route path ='/my-jobs' element = {<MyJobs/>} />

    </Routes>
  );
}

export default App;
