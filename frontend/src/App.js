import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Mainscreen from "./screens/main/Mainscreen";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddWordscreen from "./screens/addWord/AddWordscreen";
import EditWordscreen from "./screens/editWord/EditWordscreen";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileContext = createContext();

function App() {
  axios.defaults.baseURL = "https://localhost:5000/api";

  const [profile, setProfile] = useState({
    token: null,
    account: null,
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      var obj = JSON.parse(storedProfile);
      setProfile(obj);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
    axios.defaults.headers.common.Authorization = `Bearer ${profile.token}`;
  }, [profile]);

  return (
    <GoogleOAuthProvider clientId="602455590745-ksgqmkhgatav1ugkaep4j02gfqcid1e7.apps.googleusercontent.com">
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <BrowserRouter>
          <div className="App">
            <div className="navigation">
              <Navbar />
            </div>

            <div className="body">
              <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={true}
              />
              <Routes>
                <Route path="/" element={<Mainscreen />} />

                <Route path="/add" element={<AddWordscreen />} />
                <Route path="/edit" element={<EditWordscreen />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ProfileContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;

export { ProfileContext };
