import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Appbar from "./components/Appbar";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";

function App() {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/me", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  return (
    <>
      <Appbar />
    </>
  );
}

export default App;
