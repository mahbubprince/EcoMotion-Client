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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader:()=>fetch("http://localhost:3000/latest")
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
        element: <CreateEvent></CreateEvent>,
      },
      {
        path: "/manage",
        element: <Manage></Manage>,
      },
      {
        path: "/joined",
        element: <Joined></Joined>,
      },
      {
        path: "/edit-event/:id",
        element: <EditEvent></EditEvent>,
      },
      {
        path: "/upcoming",
        element: <Upcoming></Upcoming>,
        loader: () => fetch("http://localhost:3000/events"),
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
    <RouterProvider router={router} />
  </StrictMode>
);
