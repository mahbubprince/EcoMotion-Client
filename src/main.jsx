import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Register from "./componants/Register.jsx";
import Login from "./componants/Login.jsx";
import Home from "./pages/Home.jsx";
import Root from "./layout/Root.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import Error from "./pages/Error.jsx";
import EventDetails from "./pages/EventDetailes.jsx";
import Upcoming from "./pages/upcoming.jsx";
import Manage from "./pages/Manage.jsx";
import Joined from "./pages/Joined.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./route/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader:()=>fetch("https://ecomotion-server.vercel.app/latest")
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/eventDetailes/:id",
        element: <EventDetails></EventDetails>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/createEvent",
        element: <PrivateRoute><CreateEvent></CreateEvent></PrivateRoute>,
      },
      {
        path: "/manage",
        element: <PrivateRoute><Manage></Manage></PrivateRoute>,
      },
      {
        path: "/joined",
        element: <PrivateRoute><Joined></Joined></PrivateRoute>,
      },
      {
        path: "/edit-event/:id",
        element: <PrivateRoute><EditEvent></EditEvent></PrivateRoute>,
      },
      {
        path: "/upcoming",
        element: <Upcoming></Upcoming>,
        loader: () => fetch("https://ecomotion-server.vercel.app/events"),
      },
    ],
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>
);
