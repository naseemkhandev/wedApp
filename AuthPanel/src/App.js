import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Images from "./pages/list/Images";
import Videos from "./pages/list/Videos";
import Playlist from "./pages/list/Playlist";
import GiftRegistry from "./pages/list/GiftRegistry";
import Profile from "./pages/settings/Profile";
import Chatsetting from "./pages/settings/ChatSetting";
import Register from "./pages/login/Register";
import New from "./pages/new/New";
import WeddingCalender from "./pages/Events/WeddingCalender";
import Polls from "./pages/list/Polls";
import ShareUrl from "./pages/Share/ShareUrl";
import Logout from "./pages/login/Signout";
import ViewChats from "./pages/settings/Viewchat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Invite from "./pages/Events/ViewInviteCard";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [auth, setAuth] = useState(localStorage.getItem("data"));

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/home";
    }
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      setAuth(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={<Home />} /> */}
            <Route path="/login" element={auth ? <Home /> : <Login />} />
            <Route path="/home" element={auth ? <Home /> : <Login />} />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="register" element={auth ? <Home /> : <Register />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              {<Route path="new" element={<New title="Add New User" />} />}
            </Route>

            <Route path="Images">
              <Route index element={<Images />} />
              <Route path=":userId" element={<Images />} />
            </Route>
            <Route path="Videos">
              <Route index element={<Videos />} />
              <Route path=":userId" element={<Videos />} />
            </Route>
            <Route path="Chatsettings">
              <Route index element={<Chatsetting />} />
              <Route path=":userId" element={<Chatsetting />} />
            </Route>
            <Route path="Polls">
              <Route index element={<Polls />} />
              <Route path=":userId" element={<Polls />} />
            </Route>
            <Route path="Playlist">
              <Route index element={<Playlist />} />
              <Route path=":userId" element={<Playlist />} />
            </Route>
            <Route path="WeddingCalender">
              <Route index element={<WeddingCalender />} />
              <Route path=":userId" element={<WeddingCalender />} />
            </Route>

            <Route path="ShareUrl">
              <Route index element={<ShareUrl />} />
              <Route path=":userId" element={<ShareUrl />} />
            </Route>
            <Route path="GiftRegistry">
              <Route index element={<GiftRegistry />} />
              <Route path=":userId" element={<GiftRegistry />} />
            </Route>

            <Route path="WeddingCalender">
              <Route index element={<WeddingCalender />} />
              <Route path=":userId" element={<WeddingCalender />} />
            </Route>
            <Route path="ViewChat">
              <Route index element={<ViewChats />} />
              <Route path=":userId" element={<ViewChats />} />
            </Route>
            <Route path="Profile">
              <Route index element={<Profile />} />
            </Route>
            <Route path="Logout">
              <Route index element={<Logout />} />
            </Route>
            <Route path="Invite">
              <Route index element={<Invite />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
