import { useRoutes } from "react-router-dom";
import ChatLayout from "../layouts/ChatLayout";
import HomeLayout from "../layouts/HomeLayout";
import Chat from "../pages/Chat";
import Home from "../pages/Home";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/chat",
      element: <ChatLayout />,
      children: [{ path: "", element: <Chat /> }],
    },
  ]);
};

export default Routes;
